const Package = require("../Package");
const PayloadTypes = require("../util/PayloadType");
const FByteArchive = require("../../reader/FByteArchive");
const FName = require("../../objects/uobject/FName");

const COLL = new Map();
COLL.set(PayloadTypes.UBULK, new FAssetArchive());
COLL.set(PayloadTypes.UPTNL, new FAssetArchive());

/** @type {Buffer} */
let dat;

class FAssetArchive extends FByteArchive {
    /**
     * - Binary reader for UE4 Assets
     * @param {Buffer} data 
     * @param {FileProvider} provider 
     * @param {String} pkgName 
     */
    constructor(data, provider, pkgName) {
        dat = data;
        this.data = data;

        super();
        /** @type {Package} */
        this.owner = null;
        /** @type {Map<PayloadTypes, FAssetArchive>} */
        this.payloads = COLL;
        this.uassetSize = 0;
        this.uexpSize = 0;
        this.bulkDataStartOffset = 0;

        this.provider = provider;
        this.pkgName = pkgName;
    };

    /**
     * - Gets a payload
     * @param {PayloadTypes} type 
     */
    getPayload(type) {
        const payload = this.payloads.get(type);
        if (!payload) throw new Error(`${type} is needed to parse the current package`)
        return payload;
    };

    /**
     * 
     * @param {PayloadTypes} type 
     * @param {FAssetArchive} payload 
     */
    addPayload(type, payload) {
        if (this.payloads.has(type))
            throw new Error(`Can't add a payload that is already attached of type ${type}!`);

        this.payloads.set(type, payload);
    };

    /**
     * - Clones this lol
     * @returns {FAssetArchive}
     */
    clone() {
        const c = new FAssetArchive(this.data, this.provider, this.pkgName);
        c.LE = this.LE;
        c.pos = this.pos;
        this.payloads.forEach((v, k) => c.payloads.set(k) = v);
        c.uassetSize = this.uassetSize;
        c.uexpSize = this.uexpSize;
        return c;
    };

    /**
     * - Seeks a relative
     * @param {Number} pos 
     */
    seekRelative(pos) {
        this.seek(pos - this.uassetSize - this.uexpSize)
    };

    relativePos() { return this.uassetSize = this.uexpSize + this.pos() };
    toNormalPos(relativePos) { return relativePos - this.uassetSize - this.uexpSize };
    toRelativePos(normalPos) { return normalPos + this.uassetSize + this.uexpSize };

    /**
     * - Handles bad name index
     * @param {Number} nameIndex 
     */
    handleBadNameIndex(nameIndex) {
        throw new Error(`FName could not be read, requested invalid index ${nameIndex}!`);
    };

    readFName() {  
        const owner = this.owner;
        const nameIndex = this.readInt32();
        const extraIndex = this.readInt32();
        if (nameIndex in owner.nameMap?.values()) {
            return new FName(owner.nameMap, nameIndex, extraIndex);
        };
        this.handleBadNameIndex(nameIndex);
        return new FName();
    };

    readObject() {
        const out = this.owner?.findObject()
    }
};

module.exports = FAssetArchive;