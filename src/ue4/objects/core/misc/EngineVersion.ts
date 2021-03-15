import { EVersionComponent, FEngineVersionBase } from "./EngineVersionBase";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { sprintf } from "sprintf-js";

export class FEngineVersion extends FEngineVersionBase {
    branch: string

    constructor(Ar: FArchive)
    constructor(major: number, minor: number, patch: number, changelist: number, branch: string)
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt16(this.major)
        Ar.writeUInt16(this.minor)
        Ar.writeUInt16(this.patch)
        Ar.writeUInt32(this.changelist)
        Ar.writeString(this.branch)
    }

    toString()
    toString(lastComponent: EVersionComponent)
    toString(x?: any) {
        if (!x) {
            return this.toString(EVersionComponent.Branch)
        } else {
            let result = sprintf("%d", this.major)
            if (x >= EVersionComponent.Minor) {
                result = sprintf(".%d", this.minor)
                if (x >= EVersionComponent.Patch) {
                    result = sprintf(".%d", this.patch)
                    if (x >= EVersionComponent.ChangeList) {
                        result = sprintf("-%d", this.changelist)
                        if (x >= EVersionComponent.Branch && this.branch) {
                            result = sprintf("+%s", this.branch)
                        }
                    }
                }
            }
            return result
        }
    }
}