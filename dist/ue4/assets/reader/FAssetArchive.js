"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetArchive = void 0;
const FByteArchive_1 = require("../../reader/FByteArchive");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FName_1 = require("../../objects/uobject/FName");
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
/**
 * UE4 Asset Reader
 * @extends {FByteArchive}
 */
class FAssetArchive extends FByteArchive_1.FByteArchive {
    /**
     * Creates an instace
     * @param {Buffer} data Data to read
     * @param {?FileProvider} provider File provider
     * @param {string} pkgName Name of package
     * @constructor
     * @public
     */
    constructor(data, provider = null, pkgName) {
        super(data);
        /**
         * Payloads
         * @type {Map<PayloadType, FAssetArchive>}
         * @protected
         */
        this.payloads = new Map();
        /**
         * Size of uasset data
         * @type {number}
         * @public
         */
        this.uassetSize = 0;
        /**
         * Size of uexp data
         * @type {number}
         * @public
         */
        this.uexpSize = 0;
        /**
         * Start offset of bulk data
         * @type {number}
         * @public
         */
        this.bulkDataStartOffset = 0;
        this.data = data;
        this.provider = provider;
        this.pkgName = pkgName;
    }
    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FArchive} UE4 Reader
     * @public
     */
    getPayload(type) {
        const p = this.payloads.get(type);
        return p ? p : new FByteArchive_1.FByteArchive(Buffer.alloc(0));
    }
    /**
     * Add a payload
     * @param {PayloadType} type Type of payload to add
     * @param {FAssetArchive} payload Reader to add
     * @returns {Map<PayloadType, FAssetArchive>} Updated map
     * @public
     */
    addPayload(type, payload) {
        if (this.payloads.has(type))
            throw new Exceptions_1.ParserException(`Can't add a payload that is already attached of type ${type}`);
        return this.payloads.set(type, payload);
    }
    /**
     * Clones this reader
     * @returns {FAssetArchive} Cloned reader
     * @public
     */
    clone() {
        const c = new FAssetArchive(this.data, this.provider, this.pkgName);
        c.game = this.game;
        c.ver = this.ver;
        c.useUnversionedPropertySerialization = this.useUnversionedPropertySerialization;
        c.isFilterEditorOnly = this.isFilterEditorOnly;
        c.littleEndian = this.littleEndian;
        c.position = this.position;
        c.owner = this.owner;
        this.payloads.forEach((v, k) => c.addPayload(k, v));
        c.uassetSize = this.uassetSize;
        c.uexpSize = this.uexpSize;
        c.bulkDataStartOffset = this.bulkDataStartOffset;
        return c;
    }
    /**
     * Seeks to relative
     * @param {number} pos Position to seek to
     * @returns {void}
     * @public
     */
    seekRelative(pos) {
        this.pos = pos - this.uassetSize - this.uexpSize;
    }
    /**
     * Gets relative position
     * @returns {number} Position
     * @public
     */
    relativePos() {
        return this.uassetSize + this.uexpSize + this.pos;
    }
    /**
     * Turns a normal pos to relative
     * @param {number} normalPos Normal position
     * @returns {number} Relative position
     * @public
     */
    toRelativePos(normalPos) {
        return normalPos + this.uassetSize + this.uexpSize;
    }
    /**
     * Turns a relative pos to normal
     * @param {number} relativePos Relative position
     * @returns {number} Normal position
     * @public
     */
    toNormalPos(relativePos) {
        return relativePos - this.uassetSize - this.uexpSize;
    }
    /**
     * Handles bad FName index
     * @param {number} nameIndex Bad index
     * @throws {ParserException}
     * @public
     */
    handleBadNameIndex(nameIndex) {
        throw new Exceptions_1.ParserException(`FName could not be read, requested index ${nameIndex}, name map size ${this.owner.nameMap.length}`, this);
    }
    /**
     * Reads FName
     * @returns {FName} Read data
     * @public
     */
    readFName() {
        const nameIndex = this.readInt32();
        const extraIndex = this.readInt32();
        const owner = this.owner;
        const asIoPackage = !!owner.nameMap.nameEntries;
        const nameMap = asIoPackage
            ? owner.nameMap.nameEntries.map(n => new FName_1.FNameEntry(n, 0, 0))
            : owner.nameMap;
        if (nameIndex in nameMap) {
            return new FName_1.FName(nameMap, nameIndex, extraIndex);
        }
        this.handleBadNameIndex(nameIndex);
    }
    /**
     * Returns FAssetArchive info for error
     * @returns {string} Info
     * @public
     */
    printError() {
        return `FAssetArchive Info: pos ${this.pos}, stopper ${this.size}, package ${this.pkgName}`;
    }
    /**
     * Reads an object
     * @returns {?any} Read object or null
     * @public
     */
    readObject() {
        const it = new ObjectResource_1.FPackageIndex(this);
        const out = this.owner.findObject(it)?.value;
        if (!it.isNull() && !out) {
            console.warn(`${this.pkgName}: ${it} not found`);
        }
        return out;
    }
}
exports.FAssetArchive = FAssetArchive;
