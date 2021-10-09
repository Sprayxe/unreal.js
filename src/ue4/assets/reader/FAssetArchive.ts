import { FArchiveProxy } from "../../reader/FArchiveProxy";
import { FileProvider } from "../../../fileprovider/FileProvider";
import { FByteArchive } from "../../reader/FByteArchive";
import { Package } from "../Package";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { FArchive } from "../../reader/FArchive";
import { PakPackage } from "../PakPackage";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { Lazy } from "../../../util/Lazy";
import { UObject } from "../exports/UObject";

export class FAssetArchive extends FArchiveProxy {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    public data: Buffer

    /**
     * File provider
     * @type {FileProvider}
     * @public
     */
    public provider?: FileProvider

    /**
     * Name of package
     * @type {string}
     * @public
     */
    public pkgName: string

    /**
     * Creates an instance
     * @param {Buffer} data Data to read
     * @param {?FileProvider} provider File provider
     * @param {string} pkgName Name of package
     * @constructor
     * @public
     */
    constructor(data: Buffer, provider: FileProvider = null, pkgName: string) {
        super(new FByteArchive(data))
        this.data = data
        this.provider = provider
        this.pkgName = pkgName
    }

    /**
     * Package which uses this reader
     * @type {Package}
     * @public
     */
    public owner: Package

    /**
     * Payloads
     * @type {Map<PayloadType, FAssetArchive>}
     * @protected
     */
    protected payloads = new Map<PayloadType, FAssetArchive>()

    /**
     * Size of uasset data
     * @type {number}
     * @public
     */
    public uassetSize = 0

    /**
     * Size of uexp data
     * @type {number}
     * @public
     */
    public uexpSize = 0

    /**
     * Start offset of bulk data
     * @type {number}
     * @public
     */
    public bulkDataStartOffset = 0

    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FArchive} UE4 Reader
     * @public
     */
    public getPayload(type: PayloadType): FArchive {
        const p = this.payloads.get(type)
        return p ? p : new FByteArchive(Buffer.alloc(0))
    }

    /**
     * Add a payload
     * @param {PayloadType} type Type of payload to add
     * @param {FAssetArchive} payload Reader to add
     * @returns {Map<PayloadType, FAssetArchive>} Updated map
     * @public
     */
    public addPayload(type: PayloadType, payload: FAssetArchive) {
        if (this.payloads.has(type))
            throw new ParserException(`Can't add a payload that is already attached of type ${type}`)
        return this.payloads.set(type, payload)
    }

    /**
     * Clones this reader
     * @returns {FAssetArchive} Cloned reader
     * @public
     */
    public clone(): FAssetArchive {
        const c = new FAssetArchive(this.data, this.provider, this.pkgName)
        c.versions = this.versions
        c.useUnversionedPropertySerialization = this.useUnversionedPropertySerialization
        c.isFilterEditorOnly = this.isFilterEditorOnly
        c.littleEndian = this.littleEndian
        c.pos = this.pos
        c.owner = this.owner
        c.payloads = this.payloads
        c.uassetSize = this.uassetSize
        c.uexpSize = this.uexpSize
        c.bulkDataStartOffset = this.bulkDataStartOffset
        return c
    }

    /**
     * Seeks to relative
     * @param {number} pos Position to seek to
     * @returns {void}
     * @public
     */
    public seekRelative(pos: number) {
        this.pos = pos - this.uassetSize - this.uexpSize
    }

    /**
     * Gets relative position
     * @returns {number} Position
     * @public
     */
    public relativePos() {
        return this.uassetSize + this.uexpSize + this.pos
    }

    /**
     * Turns a normal pos to relative
     * @param {number} normalPos Normal position
     * @returns {number} Relative position
     * @public
     */
    public toRelativePos(normalPos: number) {
        return normalPos + this.uassetSize + this.uexpSize
    }

    /**
     * Turns a relative pos to normal
     * @param {number} relativePos Relative position
     * @returns {number} Normal position
     * @public
     */
    public toNormalPos(relativePos: number) {
        return relativePos - this.uassetSize - this.uexpSize
    }

    /**
     * Handles bad FName index
     * @param {number} nameIndex Bad index
     * @throws {ParserException}
     * @public
     */
    public handleBadNameIndex(nameIndex: number) {
        throw new ParserException(
            `FName could not be read, requested index ${nameIndex}, name map size ${(this.owner as PakPackage).nameMap.length}`, this)
    }

    /**
     * Reads FName
     * @returns {FName} Instance
     * @public
     */
    public readFName(): FName {
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

    /**
     * Returns FAssetArchive info for error
     * @returns {string} Info
     * @public
     */
    public printError() {
        return `FAssetArchive Info: pos ${this.pos}, stopper ${this.size}, package ${this.pkgName}`
    }

    /**
     * Reads an object
     * @returns {?any} Read object or null
     * @public
     */
    public readObject<T extends UObject>(): Lazy<T> {
        const it = new FPackageIndex(this)
        const out = this.owner.findObject<T>(it)
        if (!it.isNull() && out == null) {
            console.warn(`${this.pkgName}: ${it} not found`)
        }
        return out
    }
}