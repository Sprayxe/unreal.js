import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * Template for range bounds
 * @implements {IStructType}
 */
export class TRangeBound<T> implements IStructType {
    /**
     * Holds the type of the bound
     * @type {ERangeBoundTypes}
     * @public
     */
    public type: ERangeBoundTypes

    /**
     * Holds the bound's value
     * @type {any}
     * @public
     */
    public value: T

    /**
     * Creates an instance using an UE4 Reader and an init function
     * @param {FArchive} Ar Reader to use
     * @param {any} init Function to use
     * @example new TRangeBound(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T)

    /**
     * Creates an instance using values
     * @param {ERangeBoundTypes} boundType Bound type
     * @param {any} value Value
     * @constructor
     * @public
     */
    constructor(boundType: ERangeBoundTypes, value: T)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y: any) {
        if (x instanceof FArchive) {
            this.type = x.readInt8()
            this.value = y()
        } else {
            this.type = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @param {void} write Function to use
     * @example <TRangeBound>.serialize(Ar, (it) => Ar.writeInt8(it))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (it: T) => void) {
        Ar.writeInt8(this.type)
        write(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            type: Object.keys(ERangeBoundTypes)[this.type],
            value: (this.value as any).toJson ? (this.value as any).toJson() : this.value
        }
    }
}

/**
 * Enumerates the valid types of range bounds.
 */
enum ERangeBoundTypes {
    /** The range excludes the bound. */
    Exclusive,

    /** The range includes the bound. */
    Inclusive,

    /** The bound is open. */
    Open
}