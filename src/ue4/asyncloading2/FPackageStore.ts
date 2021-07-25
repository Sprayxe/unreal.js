import {
    createIoChunkId,
    EIoChunkType,
    FIoDispatcherMountedContainer,
    FOnContainerMountedListener
} from "../io/IoDispatcher";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FNameMap } from "./FNameMap";
import {
    FContainerHeader,
    FMappedName,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageStoreEntry,
    FScriptObjectEntry,
    FSourceToLocalizedPackageIdMap
} from "./AsyncLoading2";
import osLocale from "os-locale";
import { FByteArchive } from "../reader/FByteArchive";
import { ParserException } from "../../exceptions/Exceptions";
import { UnrealMap } from "../../util/UnrealMap";
import Collection from "@discordjs/collection";
import { Config } from "../../Config";

/**
 * FPackageStore (I/O)
 * @extends {FOnContainerMountedListener}
 */
export class FPackageStore extends FOnContainerMountedListener {
    /**
     * Provider
     * @type {FileProvider}
     * @public
     */
    provider: FileProvider

    /**
     * Global name map
     * @type {FNameMap}
     * @public
     */
    globalNameMap: FNameMap

    /**
     * Creates instance using values
     * @param {FileProvider} provider File provider to use
     * @param {FNameMap} globalNameMap Global name map to use
     */
    constructor(provider: FileProvider, globalNameMap: FNameMap) {
        super()
        this.provider = provider
        this.globalNameMap = globalNameMap
    }

    /**
     * Loaded containers
     * @type {Collection<bigint, FLoadedContainer>}
     * @public
     */
    loadedContainers = new Collection<bigint, FLoadedContainer>()

    /**
     * Current culture names
     * @type {Array<string>}
     * @public
     */
    currentCultureNames: string[] = []

    /**
     * Store entries
     * @type {Collection<bigint, FPackageStoreEntry>}
     * @public
     */
    storeEntries = new Collection<bigint, FPackageStoreEntry>()

    /**
     * Redirected packages
     * @type {Collection<bigint, FPackageStoreEntry>}
     * @public
     */
    redirectedPackages = new Collection<bigint, bigint>()

    /**
     * Script object entries
     * @type {Array<FScriptObjectEntry>}
     * @public
     */
    scriptObjectEntries: FScriptObjectEntry[]

    /**
     * Script object entries map
     * @type {UnrealMap<FPackageObjectIndex, FScriptObjectEntry>}
     * @public
     */
    scriptObjectEntriesMap = new UnrealMap<FPackageObjectIndex, FScriptObjectEntry>()

    /**
     * Sets up culture
     * @returns {void}
     * @public
     */
    setupCulture() {
        this.currentCultureNames = [osLocale.sync().toString().replace("_", "-")]
    }

    /**
     * Sets up initial load data
     * @returns {void}
     * @public
     */
    setupInitialLoadData() {
        const initialLoadIoBuffer = this.provider.saveChunk(createIoChunkId(0n, 0, EIoChunkType.LoaderInitialLoadMeta))
        const initialLoadArchive = new FByteArchive(initialLoadIoBuffer)
        const numScriptObjects = initialLoadArchive.readInt32()
        this.scriptObjectEntries = new Array(numScriptObjects)
        for (let i = 0; i < numScriptObjects; ++i) {
            const obj = new FScriptObjectEntry(initialLoadArchive, this.globalNameMap.nameEntries)
            const mappedName = FMappedName.fromMinimalName(obj.objectName)
            if (!mappedName.isGlobal())
                throw new ParserException("FMappedName must be global", initialLoadArchive)
            obj.objectName = this.globalNameMap.getMinimalName(mappedName)
            this.scriptObjectEntriesMap.set(obj.globalIndex, obj)
            this.scriptObjectEntries[i] = obj
        }
    }

    /**
     * Loads containers
     * @param {Array<FIoDispatcherMountedContainer>} containers Containers to load
     * @returns {void}
     * @public
     */
    loadContainers(containers: FIoDispatcherMountedContainer[]) {
        const invalidId = 0xFFFFFFFFFFFFFFFFn
        const containersToLoad = containers.filter(it => it.containerId !== invalidId)
        if (!containersToLoad.length)
            return

        const start = Date.now()
        console.log(`Loading ${containersToLoad.length} mounted containers...`)
        for (const container of containersToLoad) {
            const containerId = container.containerId
            let loadedContainer = this.loadedContainers.get(containerId)
            if (!loadedContainer) {
                const cont = new FLoadedContainer()
                this.loadedContainers.set(containerId, cont)
                loadedContainer = cont
            }

            if (loadedContainer.bValid && loadedContainer.order >= container.environment.order) {
                if (Config.GDebug) console.debug(`Skipping loading mounted container ID '${containerId}', already loaded with higher order`)
                continue
            }

            loadedContainer.bValid = true
            loadedContainer.order = container.environment.order

            const headerChunkId = createIoChunkId(containerId, 0, EIoChunkType.ContainerHeader)
            const ioBuffer = this.provider.saveChunk(headerChunkId)

            const containerHeader = new FContainerHeader(new FByteArchive(ioBuffer))

            const bHasContainerLocalNameMap = !!containerHeader.names
            if (bHasContainerLocalNameMap) {
                loadedContainer.containerNameMap.load(containerHeader.names, containerHeader.nameHashes, FMappedName_EType.Container)
            }

            loadedContainer.packageCount = containerHeader.packageCount
            loadedContainer.storeEntries = containerHeader.storeEntries

            for (const index in loadedContainer.storeEntries) {
                this.storeEntries.set(
                    containerHeader.packageIds[index],
                    loadedContainer.storeEntries[index]
                )
            }

            let localizedPackages: FSourceToLocalizedPackageIdMap = null
            for (const cultureName of this.currentCultureNames) {
                localizedPackages = containerHeader.culturePackageMap.get(cultureName)
                if (localizedPackages)
                    break
            }

            if (localizedPackages) {
                for (const pair of localizedPackages) {
                    this.redirectedPackages.set(pair.key, pair.value)
                }
            }

            for (const redirect of containerHeader.packageRedirects) {
                this.redirectedPackages.set(redirect.key, redirect.value)
            }
        }

        this.applyRedirects(this.redirectedPackages)
        console.log(`Loaded mounted containers in ${Date.now() - start}ms!`)
    }

    /**
     * On container mounted 'event'
     * @param {FIoDispatcherMountedContainer} container Container to call
     * @returns {void}
     * @public
     */
    onContainerMounted(container: FIoDispatcherMountedContainer) {
        this.loadContainers([container])
    }

    /**
     * Applies store redirects
     * @param {UnrealMap<bigint, bigint>} redirects Redirects to apply
     * @returns {void}
     * @public
     */
    applyRedirects(redirects: UnrealMap<bigint, bigint>) {
        if (!redirects.size)
            return

        for (const [sourceId, redirectId] of redirects) {
            if (redirectId === 0xFFFFFFFFFFFFFFFFn)
                throw new Error("Redirect must be valid")
            this.storeEntries.set(sourceId, this.storeEntries.get(redirectId))
        }

        for (const storeEntry of this.storeEntries.values()) {
            storeEntry.importedPackages.forEach((importedPackageId, index) => {
                storeEntry.importedPackages[index] = redirects[importedPackageId]
            })
        }
    }

    /**
     * Gets an store entry
     * @param {bigint} packageId ID of store entry to get
     * @returns {FPackageStoreEntry}
     * @public
     */
    findStoreEntry(packageId: bigint) {
        return this.storeEntries.get(packageId)
    }

    /**
     * Gets redirected package id
     * @param {bigint} packageId ID of redirect to get
     * @returns {Collection<bigint, bigint>}
     * @public
     */
    getRedirectedPackageId(packageId: bigint) {
        return this.redirectedPackages.get(packageId)
    }
}

/**
 * FLoadedContainer
 */
export class FLoadedContainer {
    /**
     * Container name map
     * @type {FNameMap}
     * @public
     */
    containerNameMap = new FNameMap()

    /**
     * Store entries
     * @type {Array<FPackageStoreEntry>}
     * @public
     */
    storeEntries: FPackageStoreEntry[] = []

    /**
     * Package count
     * @type {number}
     * @public
     */
    packageCount = 0

    /**
     * Order
     * @type {number}
     * @public
     */
    order = 0

    /**
     * bValid
     * @type {boolean}
     * @public
     */
    bValid = false
}