"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUrl = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * URL structure
 */
class FUrl {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        if (args[0] instanceof FArchive_1.FArchive) {
            const Ar = args[0];
            this.protocol = Ar.readString();
            this.host = Ar.readString();
            this.map = Ar.readString();
            this.portal = Ar.readString();
            this.op = Ar.readArray(() => Ar.readString());
            this.port = Ar.readInt32();
            this.valid = Ar.readInt32();
        }
        else {
            this.protocol = args[0];
            this.host = args[1];
            this.map = args[2];
            this.portal = args[3];
            this.op = args[4];
            this.port = args[5];
            this.valid = args[6];
        }
    }
}
exports.FUrl = FUrl;
