import { AbstractFileProvider } from "./AbstractFileProvider";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import Collection from "@discordjs/collection";
import { FIoStoreReader } from "../ue4/io/IoStore";
import { FileProvider } from "./FileProvider";
import { FNameMap } from "../ue4/asyncloading2/FNameMap";
import { FPackageStore } from "../ue4/asyncloading2/FPackageStore";
import { FIoDispatcherMountedContainer } from "../ue4/io/IoDispatcher";
import { DataTypeConverter } from "../util/DataTypeConverter";
import { Aes } from "../encryption/aes/Aes";
import { InvalidAesKeyException } from "../exceptions/Exceptions";

export abstract class PakFileProvider extends AbstractFileProvider {
    protected abstract _unloadedPaks: PakFileReader[]
    protected abstract _mountedPaks: PakFileReader[]
    protected abstract _mountedIoStoreReaders: FIoStoreReader[]
    protected abstract _requiredKeys: FGuid[]
    protected abstract _keys: Collection<FGuid, Buffer>
    protected mountListeners: PakMountListeners[] = []
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

    mount(reader: PakFileReader) {

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

export abstract class PakMountListeners {
    abstract onMount(reader: PakFileReader)
}