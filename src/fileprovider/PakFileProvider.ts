import { AbstractFileProvider } from "./AbstractFileProvider";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import Collection from "@discordjs/collection";
import { FIoStoreReader } from "../ue4/io/IoStore";
import { FileProvider } from "./FileProvider";
import { FNameMap } from "../ue4/asyncloading2/FNameMap";
import { FPackageStore } from "../ue4/asyncloading2/FPackageStore";
import { EIoChunkType, FIoChunkId, FIoDispatcherMountedContainer, FIoStoreEnvironment } from "../ue4/io/IoDispatcher";
import { DataTypeConverter } from "../util/DataTypeConverter";
import { Aes } from "../encryption/aes/Aes";
import { InvalidAesKeyException } from "../exceptions/Exceptions";
import { FPakFileArchive } from "../ue4/pak/reader/FPakFileArchive";
import { FPackageId } from "../ue4/objects/uobject/FPackageId";
import { IoPackage } from "../ue4/assets/IoPackage";
import { GameFile } from "../ue4/pak/GameFile";
import { Package } from "../ue4/assets/Package";
import { File } from "../util/File";

export abstract class PakFileProvider extends AbstractFileProvider {
    protected abstract _unloadedPaks: PakFileReader[]
    protected abstract _mountedPaks: PakFileReader[]
    protected abstract _mountedIoStoreReaders: FIoStoreReader[]
    protected abstract _requiredKeys: FGuid[]
    protected abstract _keys: Collection<FGuid, Buffer>
    protected mountListeners: PakMountListener[] = []
    globalPackageStore = _globalPackageStore(this)

    keys(): Collection<FGuid, Buffer> {
        return this._keys
    }

    keysStr(): Collection<FGuid, string> {
        return this.keys().mapValues(it => DataTypeConverter.printAesKey(it))
    }

    requiredKeys(): FGuid[] {
        return this._requiredKeys
    }

    unloadedPaks(): PakFileReader[] {
        return this._unloadedPaks
    }

    mountedPaks(): PakFileReader[] {
        return this._mountedPaks
    }

    mountedIoStoreReaders(): FIoStoreReader[] {
        return this._mountedIoStoreReaders
    }

    submitKey(guid: FGuid, key: Buffer | string) {

    }

    submitKeysStr(keys: Collection<FGuid, string>) {
        return this.submitKeys(keys.mapValues(it => Aes.parseKey(it)))
    }

    async submitKeys(keys: Collection<FGuid, Buffer>) {
        return await this.submitKeysAsync(keys)
    }

    unloadedPaksByGuid(guid: FGuid) {
        return this.unloadedPaks().filter(it => it.pakInfo.encryptionKeyGuid === guid)
    }

    /**
     * - Submits keys asynchronously
     * @param newKeys Keys to submit
     */
    async submitKeysAsync(newKeys: Collection<FGuid, Buffer>) {
        for (const [guid, key] of newKeys) {
            if (!this.requiredKeys().find(k => k === guid))
                continue
            for (const reader of this.unloadedPaksByGuid(guid)) {
                try {
                    reader.aesKey = key
                    this._keys.set(guid, key)
                    this.mount(reader)
                    this._unloadedPaks = this._unloadedPaks.filter(v => v !== reader)
                    this._requiredKeys = this._requiredKeys.filter(v => v !== guid)
                } catch (e) {
                    if (e instanceof InvalidAesKeyException) {
                        this._keys.delete(guid)
                    } else {
                        console.warn(`Uncaught exception while loading pak file ${reader.fileName.substring(reader.fileName.lastIndexOf("/") + 1)}`)
                    }
                }
            }
        }
    }

    protected mount(reader: PakFileReader) {
        reader.readIndex()
        reader.files.forEach((it) => this._files.set(it.path.toLowerCase(), it))
        this._mountedPaks.push(reader)

        if (this.globalDataLoaded && reader.Ar instanceof FPakFileArchive) {
            const ioStoreEnvironment = new FIoStoreEnvironment(reader.Ar.file.path.substring(0, reader.Ar.file.path.lastIndexOf(".")))
            try {
                const ioStoreReader = new FIoStoreReader()
                ioStoreReader.concurrent = reader.concurrent
                ioStoreReader.initialize(ioStoreEnvironment, this.keys())
                // TODO ioStoreReader.getFiles().forEach((it) => this._files.set(it.path.toLowerCase(), it))
                this._mountedIoStoreReaders.push(ioStoreReader)
                this.globalPackageStore.onContainerMounted(new FIoDispatcherMountedContainer(ioStoreEnvironment, ioStoreReader.containerId))
                console.info("Mounted IoStore environment \"{}\"", ioStoreEnvironment.path)
            } catch (e) {
                console.warn("Failed to mount IoStore environment \"{}\" [{}]", ioStoreEnvironment.path, e.message)
            }
        }

        this.mountListeners.forEach((it) => it.onMount(reader))
    }

    loadGameFile(file: GameFile): Package
    loadGameFile(packageId: FPackageId): IoPackage
    loadGameFile(filePath: string): Package
    loadGameFile(x?: any) {
        if (x instanceof FPackageId) {
            try {
                const storeEntry = this.globalPackageStore.findStoreEntry(x)
                if (!storeEntry)
                    return null
                const ioBuffer = this.saveChunk(new FIoChunkId(x.value(), 0, EIoChunkType.ExportBundleData))
                return new IoPackage(ioBuffer, x, storeEntry, this.globalPackageStore, this, this.game)
            } catch (e) {
                console.error("Failed to load package with id 0x%016X", x.value())
            }
        } else if (x instanceof GameFile) {
            if (x.ioPackageId)
                return this.loadGameFile(x.ioPackageId)
            return super.loadGameFile(x)
        } else {
            return super.loadGameFile(x)
        }
    }

    saveGameFile(file: GameFile): Buffer
    saveGameFile(filePath: string): Buffer
    saveGameFile(x?: any) {
        if (x instanceof GameFile) {
            if (x.ioPackageId)
                return this.saveChunk(new FIoChunkId(x.ioPackageId.value(), 0, EIoChunkType.ExportBundleData))
            const reader = this._mountedPaks.find(it => it.fileName === x.pakFileName)
            if (!reader)
                throw new Error("Couldn't find any possible pak file readers")
            return reader.extract(x)
        } else {
            const path = this.fixPath(x)
            const gameFile = this.findGameFile(path)
            return gameFile ? this.saveGameFile(gameFile) : null
        }
    }

    saveChunk(chunkId: FIoChunkId) {
        for (const reader of this._mountedIoStoreReaders) {
            try {
                return null // TODO reader.read(chunkId)
            } catch (e) {
                /* TODO if (e.status.errorCode != EIoErrorCode.NotFound) {
                    throw e
                    }
                }*/
            }
        }
        throw new Error("Couldn't find any possible I/O store readers")
    }

    protected loadGlobalData(globalTocFile: File) {
        this.globalDataLoaded = true
        try {
            const ioStoreReader = new FIoStoreReader()
            ioStoreReader.initialize(new FIoStoreEnvironment(globalTocFile.path.substring(0, globalTocFile.path.lastIndexOf("."))), this._keys)
            this._mountedIoStoreReaders.push(ioStoreReader)
            console.info("Initialized I/O store")
        } catch (e) {
            console.error("Failed to mount I/O store global environment: '{}'", e.message || e)
        }
    }

    addOnMountListener(listener: PakMountListener) {
        this.mountListeners.push(listener)
    }

    removeOnMountListener(listener: PakMountListener) {
        this.mountListeners = this.mountListeners.filter(it => it !== listener)
    }
}

function _globalPackageStore(provider: FileProvider) {
    const globalNameMap = new FNameMap()
    const globalPackageStore = new FPackageStore(this, globalNameMap)
    globalNameMap.loadGlobal(provider)
    globalPackageStore.setupInitialLoadData()
    globalPackageStore.setupCulture()
    globalPackageStore.loadContainers(this.mountedIoStoreReaders.map(m => new FIoDispatcherMountedContainer(m.environment, m.containerId)))
    return globalPackageStore
}

export abstract class PakMountListener {
    abstract onMount(reader: PakFileReader)
}