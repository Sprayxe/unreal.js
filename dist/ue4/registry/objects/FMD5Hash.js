"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMD5Hash = void 0;
class FMD5Hash {
    constructor(Ar) {
        this.hash = Ar.readInt32() !== 0 ? Ar.readBuffer(16) : null;
    }
}
exports.FMD5Hash = FMD5Hash;
