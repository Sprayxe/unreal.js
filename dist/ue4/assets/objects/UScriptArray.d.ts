import { FPropertyTag } from "./FPropertyTag";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { FProperty } from "./FProperty";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
/**
 * Script Array
 */
export declare class UScriptArray {
    /**
     * Inner tag of this array
     * @type {?FPropertyTag}
     * @public
     */
    innerTag: FPropertyTag;
    /**
     * Content of this array
     * @type {FProperty}
     * @public
     */
    contents: FProperty[];
    /**
     * Creates an instance using an UE4 reader
     * @param {FAssetArchive} Ar Reader to use
     * @param {PropertyType} typeData Data to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, typeData: PropertyType);
    /**
     * Creates an instance using FPropertyTag and array content
     * @param {FPropertyTag} innerTag Inner tag of the array
     * @param {Array<FProperty>} contents Content of the array
     */
    constructor(innerTag: FPropertyTag, contents: FProperty[]);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString(): string;
}
