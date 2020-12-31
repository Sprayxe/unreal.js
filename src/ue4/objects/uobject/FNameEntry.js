const FArchive = require("../../reader/FArchive");
const FArchiveWriter = require("../../writer/FArchiveWriter");

class FNameEntry {
    /**
     * - FNameEntry
     * @param {FArchive | String | Number} params 
     */
    constructor(...params) {
        params.forEach((v, k) => {
            if (k === 0) {
                switch (typeof k) {
                    case "object":
                        this.name = v.readString();
                        this.nonCasePreservingHash = v.readUInt16();
                        this.casePreservingHash = v.readUInt16();
                        break;
                    case "string":
                        break;
                };
            } else if (k === 1) {
                this.nonCasePreservingHash = v;
            } else {
                this.casePreservingHash = v;
            };
        });
    };    

    /**
     * @param {FArchiveWriter} Ar 
     */
    serialize(Ar) {
        Ar.writeString(this.name);
        Ar.writeUInt16(this.nonCasePreservingHash);
        Ar.writeUInt16(this.casePreservingHash);
    };
};

module.exports = FNameEntry;