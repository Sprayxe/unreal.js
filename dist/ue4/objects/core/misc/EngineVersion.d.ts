import { EVersionComponent, FEngineVersionBase } from "./EngineVersionBase";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * FEngineVersion
 * @extends {FEngineVersionBase}
 */
export declare class FEngineVersion extends FEngineVersionBase {
    /**
     * Branch
     * @type {string}
     * @public
     */
    branch: string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} major Major value
     * @param {number} minor Minor value
     * @param {number} patch Patch value
     * @param {number} changelist Changelist value
     * @param {string} branch Branch value
     * @constructor
     * @public
     */
    constructor(major: number, minor: number, patch: number, changelist: number, branch: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString(): any;
    /**
     * Turns this into string using a custom EVersionComponent
     * @param {EVersionComponent} lastComponent Last component
     * @returns {string}
     */
    toString(lastComponent: EVersionComponent): any;
}
