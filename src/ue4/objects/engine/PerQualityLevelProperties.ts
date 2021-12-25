import { UProperty } from "../../../util/decorators/UProperty";
import { FArchive } from "../../reader/FArchive";
import { IStructType } from "../../assets/objects/UScriptStruct";
import Collection from "@discordjs/collection";

/**
 * FPerQualityLevelInt
 * @implements {IStructType}
 */
export class FPerQualityLevelInt implements IStructType {
    /**
     * Default
     * @type {number}
     * @public
     */
    @UProperty({ name: "Default" })
    public default: number

    /**
     * Per quality
     * @type {Collection<number, number>}
     * @public
     */
    @UProperty({ name: "PerQuality" })
    public perQuality: Collection<number, number>

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const cooked = Ar.readBoolean()
        this.default = Ar.readInt32()
        const len = Ar.readInt32()
        this.perQuality = new Collection<number, number>()
        for (let i = 0; i < len; ++i) {
            this.perQuality.set(Ar.readInt32(), Ar.readInt32())
        }
    }

    public toJson(): any {
        const perQuality = {}
        this.perQuality.map((v, k) => perQuality[k + ""] = v)
        return {
            default: this.default,
            perQuality: perQuality
        }
    }
}