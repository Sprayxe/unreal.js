/**
 * Template for range bounds.
 */
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class TRangeBound<T> implements IStructType {
    /** Holds the type of the bound. */
    public type: ERangeBoundTypes

    /** Holds the bound's value. */
    public value: T

    constructor(Ar: FArchive, init: () => T)
    constructor(boundType: ERangeBoundTypes, value: T)
    constructor(x: any, y: any) {
        if (x instanceof FArchive) {
           this.type = x.readInt8()
           this.value = y()
        } else {
            this.type = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter, write: (it: T) => void) {
        Ar.writeInt8(this.type)
        write(this.value)
    }

    toJson(): any {
        return {
            type: Object.keys(ERangeBoundTypes)[this.type],
            value: this.value
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