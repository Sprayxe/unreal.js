const FArchive = require("../../reader/FArchive");
const FArchiveWriter = require("../../writer/FArchiveWriter");

class FNameEntry {
    /**
     * - FNameEntry
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.name = Ar.readString();
        this.nonCasePreservingHash = Ar.readUInt16();
        this.casePreservingHash = Ar.readUInt16();
    };    

    /**
     * - FNameEntry
     * @param {String} name 
     * @param {Number} nonCasePreservingHash 
     * @param {Number} casePreservingHash 
     */
    constructor(name, nonCasePreservingHash, casePreservingHash) {
        this.name = name;
        this.nonCasePreservingHash = nonCasePreservingHash;
        this.casePreservingHash = casePreservingHash;
    };

    /**
     * 
     * @param {FArchiveWriter} Ar 
     */
    serialize(Ar) {
        Ar.writeString(this.name);
        Ar.writeUInt16(this.nonCasePreservingHash);
        Ar.writeUInt16(this.casePreservingHash);
    };
};

module.exports = FNameEntry;