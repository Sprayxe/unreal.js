"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankHeader = void 0;
class BankHeader {
    constructor(Ar) {
        this.version = Ar.readUInt32();
        this.id = Ar.readUInt32();
    }
}
exports.BankHeader = BankHeader;
