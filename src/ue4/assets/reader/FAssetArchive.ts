import { FByteArchive } from "../../reader/FByteArchive";
import { FileProvider } from "../../../fileprovider/FileProvider";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { PakPackage } from "../PakPackage";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FArchive } from "../../reader/FArchive";

/**
 * UE4 Asset Reader
 * @extends {FByteArchive}
 */
export class FAssetArchive extends FByteArchive {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    data: Buffer

    /**
     * File provider
     * @type {FileProvider}
     * @public
     */
    provider?: FileProvider

    /**
     * Name of package
     * @type {string}
     * @public
     */
    pkgName: string

    /**
     * Creates an instace
     * @param {Buffer} data Data to read
     * @param {?FileProvider} provider File provider
     * @param {string} pkgName Name of package
     * @constructor
     * @public
     */
    constructor(data: Buffer, provider: FileProvider = null, pkgName: string) {
        super(data)
        this.data = data
        this.provider = provider
        this.pkgName = pkgName
    }

    /**
     * Package which uses this reader
     * @type {Package}
     * @public
     */
    owner: Package

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
    uassetSize = 0

    /**
     * Size of uexp data
     * @type {number}
     * @public
     */
    uexpSize = 0

    /**
     * Start offset of bulk data
     * @type {number}
     * @public
     */
    bulkDataStartOffset = 0

    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FArchive} UE4 Reader
     * @public
     */
    getPayload(type: PayloadType): FArchive {
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
    addPayload(type: PayloadType, payload: FAssetArchive) {
        if (this.payloads.has(type))
            throw new ParserException(`Can't add a payload that is already attached of type ${type}`)
        return this.payloads.set(type, payload)
    }

    /**
     * Clones this reader
     * @returns {FAssetArchive} Cloned reader
     * @public
     */
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

    /**
     * Seeks to relative
     * @param {number} pos Position to seek to
     * @returns {void}
     * @public
     */
    seekRelative(pos: number) {
        this.pos = pos - this.uassetSize - this.uexpSize
    }

    /**
     * Gets relative position
     * @returns {number} Position
     * @public
     */
    relativePos() {
        return this.uassetSize + this.uexpSize + this.pos
    }

    /**
     * Turns a normal pos to relative
     * @param {number} normalPos Normal position
     * @returns {number} Relative position
     * @public
     */
    toRelativePos(normalPos: number) {
        return normalPos + this.uassetSize + this.uexpSize
    }

    /**
     * Turns a relative pos to normal
     * @param {number} relativePos Relative position
     * @returns {number} Normal position
     * @public
     */
    toNormalPos(relativePos: number) {
        return relativePos - this.uassetSize - this.uexpSize
    }

    /**
     * Handles bad FName index
     * @param {number} nameIndex Bad index
     * @throws {ParserException}
     * @public
     */
    handleBadNameIndex(nameIndex: number) {
        throw new ParserException(
            `FName could not be read, requested index ${nameIndex}, name map size ${(this.owner as PakPackage).nameMap.length}`, this)
    }

    /**
     * Reads FName
     * @returns {FName} Read data
     * @public
     */
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

    /**
     * Returns FAssetArchive info for error
     * @returns {string} Info
     * @public
     */
    printError() {
        return `FAssetArchive Info: pos ${this.pos}, stopper ${this.size}, package ${this.pkgName}`
    }

    /**
     * Reads an object
     * @returns {?any} Read object or null
     * @public
     */
    readObject<T>(): T {
        const it = new FPackageIndex(this)
        const out = this.owner.findObject<T>(it)
        if (!it.isNull() && !out) {
            console.warn(`${this.pkgName}: ${it} not found`)
        }
        return out
    }
}