"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkEntry = void 0;
class AkEntry {
    constructor(Ar) {
        this.nameHash = Ar.readUInt32();
        this.offsetMultiplier = Ar.readUInt32();
        this.size = Ar.readInt32();
        this.offset = Ar.readUInt32();
        this.folderId = Ar.readUInt32();
    }
    toJson() {
        return {
            nameHash: this.nameHash,
            offsetMultiplier: this.offsetMultiplier,
            size: this.size,
            offset: this.offset,
            folderId: this.folderId,
            path: this.path,
            isSoundBank: this.isSoundBank
        };
    }
}
exports.AkEntry = AkEntry;
