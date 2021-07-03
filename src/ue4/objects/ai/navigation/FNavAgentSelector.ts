import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * FNavAgentSelector
 * @implements {IStructType}
 */
export class FNavAgentSelector implements IStructType {
    /**
     * packedBits
     * @type {number}
     * @public
     */
    public packedBits: number

    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number) {
        this.packedBits = arg instanceof FArchive ? arg.readUInt32() : arg
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.packedBits)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.packedBits
    }
}