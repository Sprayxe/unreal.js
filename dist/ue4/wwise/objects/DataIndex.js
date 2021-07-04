"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataIndex = void 0;
class DataIndex {
    constructor(Ar) {
        this.id = Ar.readUInt32();
        this.offset = Ar.readUInt32();
        this.length = Ar.readInt32();
    }
}
exports.DataIndex = DataIndex;
