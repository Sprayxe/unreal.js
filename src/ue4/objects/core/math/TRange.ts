import { TRangeBound } from "./TRangeBound";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class TRange<T> implements IStructType {
    /** Holds the range's lower bound. */
    public lowerBound: TRangeBound<T>

    /** Holds the range's upper bound. */
    public upperBound: TRangeBound<T>

    constructor(Ar: FArchive, init: () => T)
    constructor(lowerBound: TRangeBound<T>, upperBound: TRangeBound<T>)
    constructor(x: any, y: any) {
        if (x instanceof FArchive) {
            this.lowerBound = new TRangeBound<T>(x, y)
            this.upperBound = new TRangeBound<T>(x, y)
        } else {
            this.lowerBound = x
            this.upperBound = y
        }
    }

    serialize(Ar: FArchiveWriter, write: (it: T) => void) {
        this.lowerBound.serialize(Ar, write)
        this.upperBound.serialize(Ar, write)
    }

    toJson(): any {
        return {
            lowerBound: this.lowerBound.toJson(),
            upperBound: this.upperBound.toJson()
        }
    }
}