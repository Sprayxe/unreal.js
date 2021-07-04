import { VER_UE4_REMOVED_STRIP_DATA } from "../../versions/Versions";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FStripDataFlags
 */
export class FStripDataFlags {
    /**
     * globalStripFlags
     * @type {number}
     * @public
     */
    public globalStripFlags: number

    /**
     * classStripFlags
     * @type {number}
     * @public
     */
    public classStripFlags: number

    /**
     * Creates an instance using values
     * @param {number} globalStripFlags Global strip flags to use
     * @param {number} classStripFlags Class strip flags to use
     * @constructor
     * @public
     */
    constructor(globalStripFlags: number, classStripFlags: number)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {?number} minVersion Minimum version
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, minVersion?: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            y = y == null ? VER_UE4_REMOVED_STRIP_DATA : y
            if (x.ver >= y) {
                this.globalStripFlags = x.readUInt8()
                this.classStripFlags = x.readUInt8()
            } else {
                this.globalStripFlags = 0
                this.classStripFlags = 0
            }
        } else {
            this.globalStripFlags = x
            this.classStripFlags = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt8(this.globalStripFlags)
        Ar.writeUInt8(this.classStripFlags)
    }

    /**
     * Whether editor data stripped
     * @type {boolean}
     * @public
     */
    get isEditorDataStripped() {
        return (this.globalStripFlags & 1) !== 0
    }

    /**
     * Whether data stripped for server
     * @type {boolean}
     * @public
     */
    get isDataStrippedForServer() {
        return (this.globalStripFlags & 2) !== 0
    }

    /**
     * Whether class stripped
     * @param {number} flag Flag
     * @returns {boolean} Result
     * @public
     */
    isClassDataStripped(flag: number) {
        return (this.classStripFlags & flag) !== 0
    }
}