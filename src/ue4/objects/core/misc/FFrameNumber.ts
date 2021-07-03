import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * FFrameNumber
 * @implements {IStructType}
 */
export class FFrameNumber implements IStructType {
    /**
     * Value
     * @type {number}
     * @public
     */
    public value: number

    /**
     * Creates an instance using an UE4 Reader or number
     * @param {FArchive | number} arg UE4 Reader or number to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number) {
        this.value = arg instanceof FArchive ? arg.readFloat32() : arg
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.value
    }
}