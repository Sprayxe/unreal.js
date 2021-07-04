import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Template for range bounds
 * @implements {IStructType}
 */
export declare class TRangeBound<T> implements IStructType {
    /**
     * Holds the type of the bound
     * @type {ERangeBoundTypes}
     * @public
     */
    type: ERangeBoundTypes;
    /**
     * Holds the bound's value
     * @type {any}
     * @public
     */
    value: T;
    /**
     * Creates an instance using an UE4 Reader and an init function
     * @param {FArchive} Ar Reader to use
     * @param {any} init Function to use
     * @example new TRangeBound(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T);
    /**
     * Creates an instance using values
     * @param {ERangeBoundTypes} boundType Bound type
     * @param {any} value Value
     * @constructor
     * @public
     */
    constructor(boundType: ERangeBoundTypes, value: T);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @param {void} write Function to use
     * @example <TRangeBound>.serialize(Ar, (it) => Ar.writeInt8(it))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (it: T) => void): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * Enumerates the valid types of range bounds.
 */
declare enum ERangeBoundTypes {
    /** The range excludes the bound. */
    Exclusive = 0,
    /** The range includes the bound. */
    Inclusive = 1,
    /** The bound is open. */
    Open = 2
}
export {};
