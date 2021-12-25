import { createIoChunkId, EIoChunkType, EIoChunkType5, FOnContainerMountedListener } from "../io/IoDispatcher";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FNameMap } from "./FNameMap";
import { FMappedName, FMappedName_EType, FPackageObjectIndex } from "./AsyncLoading2";
import { FByteArchive } from "../reader/FByteArchive";
import { UnrealMap } from "../../util/UnrealMap";
import Collection from "@discordjs/collection";
import { FFilePackageStoreEntry, FIoContainerHeader } from "../io/IoContainerHeader";
import { FName } from "../objects/uobject/FName";
import { Pair } from "../../util/Pair";
import { FMinimalName } from "../objects/uobject/NameTypes";
import { FArchive } from "../reader/FArchive";
import { Game } from "../versions/Game";
import { FIoStoreReader } from "../io/IoStore";


/**
 * FScriptObjectEntry
 */
export class FScriptObjectEntry {
    /**
     * objectName
     * @type {FMinimalName}
     * @public
     */
    objectName: FMinimalName

    /**
     * globalIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    globalIndex: FPackageObjectIndex

    /**
     * outerIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    outerIndex: FPackageObjectIndex

    /**
     * cdoClassIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    cdoClassIndex: FPackageObjectIndex

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, nameMap: string[]) {
        this.objectName = new FMinimalName(Ar, nameMap)
        this.globalIndex = new FPackageObjectIndex(Ar)
        this.outerIndex = new FPackageObjectIndex(Ar)
        this.cdoClassIndex = new FPackageObjectIndex(Ar)
    }
}

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
    public provider: FileProvider

    /**
     * Creates instance using values
     * @param {FileProvider} provider File provider to use
     */
    public constructor(provider: FileProvider) {
        super()
        this.provider = provider
        let initialLoadArchive: FArchive
        const globalNameMap = new FNameMap()
        if (this.provider.game >= Game.GAME_UE5_BASE) {
            initialLoadArchive = new FByteArchive(this.provider.saveChunk(createIoChunkId(0n, 0, EIoChunkType5.ScriptObjects)))
            globalNameMap.load(initialLoadArchive, FMappedName_EType.Global)
        } else {
            const nameBuffer = this.provider.saveChunk(createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNames))
            const hashBuffer = this.provider.saveChunk(createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNameHashes))
            globalNameMap.load(nameBuffer, hashBuffer, FMappedName_EType.Global)

            initialLoadArchive = new FByteArchive(this.provider.saveChunk(createIoChunkId(0n, 0, EIoChunkType.LoaderInitialLoadMeta)))
        }

        const numScriptObjects = initialLoadArchive.readInt32()
        for (let i = 0; i < numScriptObjects; ++i) {
            const entry = new FScriptObjectEntry(initialLoadArchive, globalNameMap.nameEntries)
            const mappedName = FMappedName.fromMinimalName(entry.objectName)
            if (!mappedName.isGlobal())
                throw new Error("FMappedName must be global.")

            entry.objectName = globalNameMap.getMinimalName(mappedName)
            this.scriptObjectEntries.set(entry.globalIndex, entry)
        }

        // currentCultureNames.add(Locale.getDefault().toString().replace('_', '-'))
        this.loadContainers(this.provider.mountedPaks.filter(p => p instanceof FIoStoreReader) as FIoStoreReader[])
    }

    /**
     * Loaded containers
     * @type {Collection<bigint, FLoadedContainer>}
     * @public
     */
    public loadedContainers = new Collection<bigint, FLoadedContainer>()

    /**
     * Package Name Maps Critical
     * @type {{}}
     * @public
     */
    public packageNameMapsCritical = {}

    /**
     * Current culture names
     * @type {Array<string>}
     * @public
     currentCultureNames: string[] = []*/

    /**
     * Store entries
     * @type {Collection<bigint, FFilePackageStoreEntry>}
     * @public
     */
    storeEntries = new Collection<bigint, FFilePackageStoreEntry>()

    /**
     * Redirected packages
     * @type {Collection<bigint, Pair<FName, bigint>>}
     * @public
     */
    redirectedPackages = new Collection<bigint, Pair<FName, bigint>>()

    /**
     * Script object entries
     * @type {Array<FScriptObjectEntry>}
     * @public
     scriptObjectEntries: FScriptObjectEntry[]*/

    /**
     * Script object entries map
     * @type {UnrealMap<FPackageObjectIndex, FScriptObjectEntry>}
     * @public
     */
    scriptObjectEntries = new UnrealMap<FPackageObjectIndex, FScriptObjectEntry>()

    /**
     * Sets up culture
     * @returns {void}
     * @public
     setupCulture() {
        this.currentCultureNames = [osLocale.sync().toString().replace("_", "-")]
    }*/

    /**
     * Sets up initial load data
     * @returns {void}
     * @public
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
    }*/

    /**
     * Loads containers
     * @param {Array<FIoStoreReader>} containers Containers to load
     * @returns {void}
     * @public
     */
    loadContainers(containers: FIoStoreReader[]) {
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

            const headerChunkId = createIoChunkId(containerId, 0, this.provider.game >= Game.GAME_UE5_BASE
                ? EIoChunkType5.ContainerHeader
                : EIoChunkType.ContainerHeader)
            const ioBuffer = container.read(headerChunkId)

            const containerHeader = new FIoContainerHeader(new FByteArchive(ioBuffer, this.provider.versions))
            loadedContainer.containerNameMap = containerHeader.redirectsNameMap
            loadedContainer.packageCount = containerHeader.packageCount
            loadedContainer.storeEntries = containerHeader.storeEntries

            for (const index in loadedContainer.storeEntries) {
                this.storeEntries.set(
                    containerHeader.packageIds[index],
                    loadedContainer.storeEntries[index]
                )
            }

            /*let localizedPackages: FSourceToLocalizedPackageIdMap = null
            for (const cultureName of this.currentCultureNames) {
                localizedPackages = containerHeader.culturePackageMap.get(cultureName)
                if (localizedPackages)
                    break
            }

            if (localizedPackages) {
                for (const pair of localizedPackages) {
                    this.redirectedPackages.set(pair.key, pair.value)
                }
            }*/

            for (const redirect of containerHeader.packageRedirects) {
                const sourcePackageName = redirect.sourcePackageName != null
                    ? containerHeader.redirectsNameMap.getName(redirect.sourcePackageName) ?? FName.NAME_None
                    : FName.NAME_None
                this.redirectedPackages.set(redirect.sourcePackageId, new Pair(sourcePackageName, redirect.targetPackageId))
            }
        }

        //this.applyRedirects(this.redirectedPackages)
        console.log(`Loaded mounted containers in ${Date.now() - start}ms!`)
    }

    /**
     * On container mounted 'event'
     * @param {FIoStoreReader} container Container to call
     * @returns {void}
     * @public
     */
    onContainerMounted(container: FIoStoreReader) {
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
                storeEntry.importedPackages[index] = redirects.get(importedPackageId)
            })
        }
    }

    /**
     * Gets an store entry
     * @param {bigint} packageId ID of store entry to get
     * @returns {FFilePackageStoreEntry}
     * @public
     */
    findStoreEntry(packageId: bigint): FFilePackageStoreEntry {
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
     * @type {Array<FFilePackageStoreEntry>}
     * @public
     */
    storeEntries: FFilePackageStoreEntry[] = []

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