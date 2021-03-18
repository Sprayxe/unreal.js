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
        // TODO return this.unloadedPaks().filter(it => it.pakInfo.encryptionKeyGuid === guid)
    }

    /**
     * - Submits keys asynchronously
     * @param newKeys Keys to submit
     */
    async submitKeysAsync(newKeys: Collection<FGuid, Buffer>) {

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