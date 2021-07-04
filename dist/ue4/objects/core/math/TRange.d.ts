import { TRangeBound } from "./TRangeBound";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Represents an UE4 Range
 * @implements {IStructType}
 */
export declare class TRange<T> implements IStructType {
    /**
     * Holds the range's lower bound
     * @type {TRangeBound}
     * @public
     */
    lowerBound: TRangeBound<T>;
    /**
     * Holds the range's upper bound
     * @type {TRangeBound}
     * @public
     */
    upperBound: TRangeBound<T>;
    /**
     * Creates an instance using an UE4 Reader and an init function
     * @param {FArchive} Ar Reader to use
     * @param {any} init Function to use
     * @example new TRange(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T);
    /**
     * Creates an instance using values
     * @param {TRangeBound} lowerBound Lower bound
     * @param {TRangeBound} upperBound Upper bound
     * @constructor
     * @public
     */
    constructor(lowerBound: TRangeBound<T>, upperBound: TRangeBound<T>);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @param {void} write Function to use
     * @example <TRange>.serialize(Ar, (it) => Ar.writeInt8(it))
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
