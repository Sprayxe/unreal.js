import { IStructType } from "../../assets/objects/UScriptStruct";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FWeightedRandomSampler
 * @implements {IStructType}
 */
export class FWeightedRandomSampler implements IStructType {
    /**
     * prob
     * @type {Array<number>}
     * @public
     */
    public prob: number[]

    /**
     * alias
     * @type {Array<number>}
     * @public
     */
    public alias: number[]

    /**
     * totalWeight
     * @type {number}
     * @public
     */
    public totalWeight: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {Array<number>} prob Prob to use
     * @param {Array<number>} alias Alias to use
     * @param {number} totalWeight Total weight to use
     * @constructor
     * @public
     */
    constructor(prob: number[], alias: number[], totalWeight: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            const len1 = x.readInt32()
            this.prob = new Array(len1)
            for (let i = 0; i < len1; ++i) {
                this.prob[i] = x.readFloat32()
            }
            const len2 = x.readInt32()
            this.alias = new Array(len2)
            for (let i = 0; i < len1; ++i) {
                this.alias[i] = x.readInt32()
            }
            this.totalWeight = x.readFloat32()
        } else {
            this.prob = x
            this.alias = y
            this.totalWeight = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeTArray(this.prob, (it) => Ar.writeFloat32(it))
        Ar.writeTArray(this.alias, (it) => Ar.writeInt32(it))
        Ar.writeFloat32(this.totalWeight)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            prob: this.prob,
            alias: this.alias,
            totalWeight: this.totalWeight
        }
    }
}