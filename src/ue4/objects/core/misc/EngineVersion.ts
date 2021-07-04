import { EVersionComponent, FEngineVersionBase } from "./EngineVersionBase";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { sprintf } from "sprintf-js";

/**
 * FEngineVersion
 * @extends {FEngineVersionBase}
 */
export class FEngineVersion extends FEngineVersionBase {
    /**
     * Branch
     * @type {string}
     * @public
     */
    branch: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} major Major value
     * @param {number} minor Minor value
     * @param {number} patch Patch value
     * @param {number} changelist Changelist value
     * @param {string} branch Branch value
     * @constructor
     * @public
     */
    constructor(major: number, minor: number, patch: number, changelist: number, branch: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (params[0] instanceof FArchive) {
            const Ar = params[0]
            super(Ar.readUInt16(), Ar.readUInt16(), Ar.readUInt16(), Ar.readUInt32())
            this.branch = Ar.readString()
        } else {
            super(params[0], params[1], params[2], params[3])
            this.branch = params[4]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt16(this.major)
        Ar.writeUInt16(this.minor)
        Ar.writeUInt16(this.patch)
        Ar.writeUInt32(this.changelist)
        Ar.writeString(this.branch)
    }

    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString()

    /**
     * Turns this into string using a custom EVersionComponent
     * @param {EVersionComponent} lastComponent Last component
     * @returns {string}
     */
    toString(lastComponent: EVersionComponent)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    toString(x?: any) {
        if (x == null) {
            return this.toString(EVersionComponent.Branch)
        } else {
            let result = sprintf("%d", this.major)
            if (x >= EVersionComponent.Minor) {
                result += sprintf(".%d", this.minor)
                if (x >= EVersionComponent.Patch) {
                    result += sprintf(".%d", this.patch)
                    if (x >= EVersionComponent.ChangeList) {
                        result += sprintf("-%d", this.changelist)
                        if (x >= EVersionComponent.Branch && this.branch) {
                            result += sprintf("+%s", this.branch !== "")
                        }
                    }
                }
            }
            return result
        }
    }
}