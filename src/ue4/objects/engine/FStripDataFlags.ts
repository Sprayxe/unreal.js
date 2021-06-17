import { VER_UE4_REMOVED_STRIP_DATA } from "../../versions/Versions";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FStripDataFlags {
    public globalStripFlags: number
    public classStripFlags: number

    constructor(globalStripFlags: number, classStripFlags: number)
    constructor(Ar: FArchive, minVersion?: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            y = y == null ? VER_UE4_REMOVED_STRIP_DATA : y
            if (x.ver >= y) {
                this.globalStripFlags = x.readUInt8()
                this.classStripFlags = x.readUInt8()
            } else {
                this.globalStripFlags = 0
                this.classStripFlags = 0
            }
        } else {
            this.globalStripFlags = x
            this.classStripFlags = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt8(this.globalStripFlags)
        Ar.writeUInt8(this.classStripFlags)
    }

    get isEditorDataStripped() {
        return (this.globalStripFlags & 1) !== 0
    }

    get isDataStrippedForServer() {
        return (this.globalStripFlags & 2) !== 0
    }

    isClassDataStripped(flag: number) {
        return (this.classStripFlags & flag) !== 0
    }
}