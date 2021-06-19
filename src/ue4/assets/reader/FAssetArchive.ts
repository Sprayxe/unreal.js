import { FByteArchive } from "../../reader/FByteArchive";
import { FileProvider } from "../../../fileprovider/FileProvider";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { PakPackage } from "../PakPackage";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { UnrealMap } from "../../../util/UnrealMap";
import { FArchive } from "../../reader/FArchive";

export class FAssetArchive extends FByteArchive {
    data: Buffer
    provider?: FileProvider
    pkgName: string

    constructor(data: Buffer, provider: FileProvider = null, pkgName: string) {
        super(data)
        this.data = data
        this.provider = provider
        this.pkgName = pkgName
    }

    owner: Package
    protected payloads = new Map<PayloadType, FAssetArchive>()
    uassetSize = 0
    uexpSize = 0
    bulkDataStartOffset = 0

    getPayload(type: PayloadType): FArchive {
        const p = this.payloads.get(type)
        return p ? p : new FByteArchive(Buffer.alloc(0))
    }

    addPayload(type: PayloadType, payload: FAssetArchive) {
        if (this.payloads.has(type))
            throw ParserException(`Can't add a payload that is already attached of type ${type}`)
        return this.payloads.set(type, payload)
    }

    clone(): FAssetArchive {
        const c = new FAssetArchive(this.data, this.provider, this.pkgName)
        c.game = this.game
        c.ver = this.ver
        c.useUnversionedPropertySerialization = this.useUnversionedPropertySerialization
        c.isFilterEditorOnly = this.isFilterEditorOnly
        c.littleEndian = this.littleEndian
        c.position = this.position
        c.owner = this.owner
        this.payloads.forEach((v, k) => c.addPayload(k, v))
        c.uassetSize = this.uassetSize
        c.uexpSize = this.uexpSize
        c.bulkDataStartOffset = this.bulkDataStartOffset
        return c
    }

    seekRelative(pos: number) {
        this.pos = pos - this.uassetSize - this.uexpSize
    }

    relativePos() {
        return this.uassetSize + this.uexpSize + this.pos
    }

    toRelativePos(normalPos: number) {
        return normalPos + this.uassetSize + this.uexpSize
    }

    toNormalPos(relativePos: number) {
        return relativePos - this.uassetSize - this.uexpSize
    }

    handleBadNameIndex(nameIndex: number) {
        throw ParserException(
            `FName could not be read, requested index ${nameIndex}, name map size ${(this.owner as PakPackage).nameMap.length}`)
    }

    readFName(): FName {
        const nameIndex = this.readInt32()
        const extraIndex = this.readInt32()
        const owner = this.owner as any
        const asIoPackage = !!owner.nameMap.nameEntries
        const nameMap = asIoPackage
            ? owner.nameMap.nameEntries.map(n => new FNameEntry(n, 0, 0))
            : owner.nameMap
        if (nameIndex in nameMap) {
            return new FName(nameMap, nameIndex, extraIndex)
        }
        this.handleBadNameIndex(nameIndex)
    }

    printError() {
        return console.log(`FAssetArchive Info: pos ${this.pos}, stopper ${this.size}, package ${this.pkgName}`)
    }

    readObject<T>(): T {
        const it = new FPackageIndex(this)
        const out = this.owner.findObject<T>(it)
        if (!it.isNull() && !out) {
            console.warn(`${this.pkgName}: ${it} not found`)
        }
        return out
    }
}