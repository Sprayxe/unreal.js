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

export class FPackageStore extends FOnContainerMountedListener {
    provider: FileProvider
    globalNameMap: FNameMap

    constructor(provider: FileProvider, globalNameMap: FNameMap) {
        super()
        this.provider = provider
        this.globalNameMap = globalNameMap
    }

    loadedContainers = {} // UnrealMap<FIoContainerId, FLoadedContainer>

    currentCultureNames: string[] = []

    storeEntries = {} // UnrealMap<FPackageId, FPackageStoreEntry>
    redirectedPackages = {} // UnrealMap<FPackageId, FPackageId>

    scriptObjectEntries: FScriptObjectEntry[] = []
    scriptObjectEntriesMap = new UnrealMap<FPackageObjectIndex, FScriptObjectEntry>()

    setupCulture() {
        this.currentCultureNames = []
        this.currentCultureNames.push(osLocale.sync().toString().replace("_", "-"))
    }

    setupInitialLoadData() {
        const initialLoadIoBuffer = this.provider.saveChunk(createIoChunkId("0", 0, EIoChunkType.LoaderInitialLoadMeta))
        const initialLoadArchive = new FByteArchive(initialLoadIoBuffer)
        const numScriptObjects = initialLoadArchive.readInt32()
        for (let i = 0; i < numScriptObjects; ++i) {
            const obj = new FScriptObjectEntry(initialLoadArchive, this.globalNameMap.nameEntries)
            const mappedName = FMappedName.fromMinimalName(obj.objectName)
            if (!mappedName.isGlobal())
                throw ParserException("FMappedName must be global")
            obj.objectName = this.globalNameMap.getMinimalName(mappedName)
            this.scriptObjectEntriesMap.set(obj.globalIndex, obj)
            this.scriptObjectEntries.push(obj)
        }
    }

    // TODO: This is slow, takes somewhere around ~3-4s (probably because of sync methods)
    loadContainers(containers: FIoDispatcherMountedContainer[]) {
        const invalidId = (0xFFFFFFFFFFFFFFFFn).toString()
        const containersToLoad = containers.filter(it => it.containerId !== invalidId)
        if (!containersToLoad.length)
            return

        const start = Date.now()
        console.log(`Loading ${containersToLoad.length} mounted containers...`)
        for (const container of containersToLoad) {
            const containerId = container.containerId
            let loadedContainer = this.loadedContainers[containerId]
            if (!loadedContainer) {
                const cont = new FLoadedContainer()
                this.loadedContainers[containerId] = cont
                loadedContainer = cont
            }

            if (loadedContainer.bValid && loadedContainer.order >= container.environment.order) {
                console.debug(`Skipping loading mounted container ID '${containerId}', already loaded with higher order`)
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

            loadedContainer.storeEntries.forEach((containerEntry, index) => {
                const packageId = containerHeader.packageIds[index]
                this.storeEntries[packageId] = containerEntry
            })

            let localizedPackages: FSourceToLocalizedPackageIdMap = null
            for (const cultureName of this.currentCultureNames) {
                localizedPackages = containerHeader.culturePackageMap.get(cultureName)
                if (localizedPackages)
                    break
            }

            if (localizedPackages) {
                for (const pair of localizedPackages) {
                    this.redirectedPackages[pair.key] = pair.value
                }
            }

            for (const redirect of containerHeader.packageRedirects) {
                this.redirectedPackages[redirect.key] = redirect.value
            }
        }

        this.applyRedirects(this.redirectedPackages)
        console.log(`Loaded mounted containers in ${Date.now() - start}ms!`)
    }

    onContainerMounted(container:FIoDispatcherMountedContainer) {
        this.loadContainers([container])
    }

    applyRedirects(redirects: object) {
        if (!Object.keys(redirects).length)
            return

        for (const sourceId in redirects) {
            const redirectId = redirects[sourceId]
            if (!redirectId.isValid())
                throw new Error("Redirect must be valid")
            this.storeEntries[sourceId] = this.storeEntries[redirectId]
        }

        for (const storeEntryKey in this.storeEntries) {
            const storeEntry = this.storeEntries[storeEntryKey]
            if (!storeEntry)
                continue;
            storeEntry.importedPackages.forEach((importedPackageId, index) => {
                storeEntry.importedPackages[index] = redirects[importedPackageId]
            })
        }
    }

    findStoreEntry(packageId: string) {
        return this.storeEntries[packageId]
    }

    getRedirectedPackageId(packageId: string) {
        return this.redirectedPackages[packageId]
    }
}

export class FLoadedContainer {
    containerNameMap = new FNameMap()
    storeEntries: FPackageStoreEntry[] = []
    packageCount = 0
    order = 0
    bValid = false
}