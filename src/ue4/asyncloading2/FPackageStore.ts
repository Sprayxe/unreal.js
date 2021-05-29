import {
    createIoChunkId,
    EIoChunkType,
    FIoDispatcherMountedContainer,
    FOnContainerMountedListener
} from "../io/IoDispatcher";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FNameMap } from "./FNameMap";
import { FIoContainerId } from "../io/IoContainerId";
import { FPackageId } from "../objects/uobject/FPackageId";
import {
    FContainerHeader,
    FMappedName, FMappedName_EType,
    FPackageObjectIndex,
    FPackageStoreEntry,
    FScriptObjectEntry, FSourceToLocalizedPackageIdMap
} from "./AsyncLoading2";
import osLocale from "os-locale";
import { FByteArchive } from "../reader/FByteArchive";
import { Utils } from "../../util/Utils";
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

    loadedContainers = new UnrealMap<FIoContainerId, FLoadedContainer>()

    currentCultureNames: string[] = []

    storeEntriesMap = new UnrealMap<FPackageId, FPackageStoreEntry>()
    redirectsPackageMap = new UnrealMap<FPackageId, FPackageId>()

    scriptObjectEntries: FScriptObjectEntry[] = []
    scriptObjectEntriesMap = new UnrealMap<FPackageObjectIndex, FScriptObjectEntry>()

    setupCulture() {
        this.currentCultureNames = []
        this.currentCultureNames.push(osLocale.sync().toString().replace("_", "-"))
    }

    setupInitialLoadData() {
        const initialLoadIoBuffer = this.provider.saveChunk(createIoChunkId("0", 0, EIoChunkType.LoaderInitialLoadMeta))
        const initialLoadArchive = new FByteArchive(initialLoadIoBuffer)
        const numScriptObjects = initialLoadArchive.readInt32() - 1
        Utils.repeat(numScriptObjects, () => {
            const obj = new FScriptObjectEntry(initialLoadArchive, this.globalNameMap.nameEntries)
            const mappedName = FMappedName.fromMinimalName(obj.objectName)
            if (!mappedName.isGlobal())
                throw ParserException("FMappedName must be global")
            obj.objectName = this.globalNameMap.getMinimalName(mappedName)
            this.scriptObjectEntriesMap.set(obj.globalIndex, obj)
            this.scriptObjectEntries.push(obj)
        })
    }

    loadContainers(containers: FIoDispatcherMountedContainer[]) {
        const containersToLoad = containers.filter(it =>  it.containerId.isValid())
        if (!containersToLoad.length)
            return

        for (const container of containersToLoad) {
            try {
                const containerId = container.containerId
                let loadedContainer = this.loadedContainers.get(containerId)
                if (!loadedContainer) {
                    const cont = new FLoadedContainer()
                    this.loadedContainers.set(containerId, cont)
                    loadedContainer = cont
                }

                if (loadedContainer.bValid && loadedContainer.order >= container.environment.order) {
                    console.debug(`Skipping loading mounted container ID '${containerId.value()}', already loaded with higher order`)
                    continue
                }

                console.debug(`Loading mounted container ID '${containerId.value()}'`)
                loadedContainer.bValid = true
                loadedContainer.order = container.environment.order

                const headerChunkId = createIoChunkId(containerId.value(), 0, EIoChunkType.ContainerHeader)
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
                    this.storeEntriesMap.set(packageId, containerEntry)
                })

                let localizedPackages: FSourceToLocalizedPackageIdMap = null
                for (const cultureName of this.currentCultureNames) {
                    localizedPackages = containerHeader.culturePackageMap.get(cultureName)
                    if (localizedPackages)
                        break
                }

                if (localizedPackages) {
                    for (const pair of localizedPackages) {
                        const sourceId = pair.key
                        const localizedId = pair.value
                        this.redirectsPackageMap.set(sourceId, localizedId)
                    }
                }

                for (const redirect of containerHeader.packageRedirects) {
                    this.redirectsPackageMap.set(redirect.key, redirect.value)
                }
            } catch (e) {
                console.debug(`Could not load container '${container.containerId.value()}', error: ${e}`)
            }
        }

        this.applyRedirects(this.redirectsPackageMap)
    }

    onContainerMounted(container:FIoDispatcherMountedContainer) {
        this.loadContainers([container])
    }

    applyRedirects(redirects: UnrealMap<FPackageId, FPackageId>) {
        if (!redirects.size)
            return

        redirects.forEach((redirectId, sourceId) => {
            if (!redirectId.isValid())
                throw new Error("Redirect must be valid")
            const redirectEntry = this.storeEntriesMap.get(redirectId)
            this.storeEntriesMap.set(sourceId, redirectEntry)
        })

        for (const storeEntry of this.storeEntriesMap.values()) {
            if (!storeEntry)
                continue;
            storeEntry.importedPackages.forEach((importedPackageId, index) => {
                storeEntry.importedPackages[index] = redirects.get(importedPackageId)
            })
        }
    }

    findStoreEntry(packageId: FPackageId) {
        return this.storeEntriesMap.get(packageId)
    }

    getRedirectedPackageId(packageId: FPackageId) {
        return this.redirectsPackageMap.get(packageId)
    }
}

export class FLoadedContainer {
    containerNameMap = new FNameMap()
    storeEntries: FPackageStoreEntry[] = []
    packageCount = 0
    order = 0
    bValid = false
}