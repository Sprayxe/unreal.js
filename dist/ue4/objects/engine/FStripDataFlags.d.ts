import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * FStripDataFlags
 */
export declare class FStripDataFlags {
    /**
     * globalStripFlags
     * @type {number}
     * @public
     */
    globalStripFlags: number;
    /**
     * classStripFlags
     * @type {number}
     * @public
     */
    classStripFlags: number;
    /**
     * Creates an instance using values
     * @param {number} globalStripFlags Global strip flags to use
     * @param {number} classStripFlags Class strip flags to use
     * @constructor
     * @public
     */
    constructor(globalStripFlags: number, classStripFlags: number);
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {?number} minVersion Minimum version
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, minVersion?: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Whether editor data stripped
     * @type {boolean}
     * @public
     */
    get isEditorDataStripped(): boolean;
    /**
     * Whether data stripped for server
     * @type {boolean}
     * @public
     */
    get isDataStrippedForServer(): boolean;
    /**
     * Whether class stripped
     * @param {number} flag Flag
     * @returns {boolean} Result
     * @public
     */
    isClassDataStripped(flag: number): boolean;
}
