"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FStripDataFlags = void 0;
const Versions_1 = require("../../versions/Versions");
const FArchive_1 = require("../../reader/FArchive");
/**
 * FStripDataFlags
 */
class FStripDataFlags {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            y = y == null ? Versions_1.VER_UE4_REMOVED_STRIP_DATA : y;
            if (x.ver >= y) {
                this.globalStripFlags = x.readUInt8();
                this.classStripFlags = x.readUInt8();
            }
            else {
                this.globalStripFlags = 0;
                this.classStripFlags = 0;
            }
        }
        else {
            this.globalStripFlags = x;
            this.classStripFlags = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt8(this.globalStripFlags);
        Ar.writeUInt8(this.classStripFlags);
    }
    /**
     * Whether editor data stripped
     * @type {boolean}
     * @public
     */
    get isEditorDataStripped() {
        return (this.globalStripFlags & 1) !== 0;
    }
    /**
     * Whether data stripped for server
     * @type {boolean}
     * @public
     */
    get isDataStrippedForServer() {
        return (this.globalStripFlags & 2) !== 0;
    }
    /**
     * Whether class stripped
     * @param {number} flag Flag
     * @returns {boolean} Result
     * @public
     */
    isClassDataStripped(flag) {
        return (this.classStripFlags & flag) !== 0;
    }
}
exports.FStripDataFlags = FStripDataFlags;
