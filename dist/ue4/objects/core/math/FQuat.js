"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FQuat = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Represents an UE4 FQuat
 * @implements {IStructType}
 */
class FQuat {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0];
        if (arg instanceof FArchive_1.FArchive) {
            this.x = arg.readFloat32();
            this.y = arg.readFloat32();
            this.z = arg.readFloat32();
            this.w = arg.readFloat32();
        }
        else {
            this.x = arg;
            this.y = args[1];
            this.z = args[2];
            this.w = args[3];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFloat32(this.x);
        Ar.writeFloat32(this.y);
        Ar.writeFloat32(this.z);
        Ar.writeFloat32(this.w);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        };
    }
}
exports.FQuat = FQuat;
