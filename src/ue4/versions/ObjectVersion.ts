import { FArchive } from "../reader/FArchive";

export enum EUnrealEngineObjectUE5Version {
    INITIAL_VERSION = 1000,
    NAMES_REFERENCED_FROM_EXPORT_DATA,
    PAYLOAD_TOC,

    AUTOMATIC_VERSION = PAYLOAD_TOC
}

export class FPackageFileVersion {
    public fileVersionUE4: number
    public fileVersionUE5: number

    public constructor(arg1: FArchive | number, arg2?: number) {
        if (arg1 instanceof FArchive) {
            this.fileVersionUE4 = arg1.readInt32()
            this.fileVersionUE5 = arg1.readInt32()
        } else {
            this.fileVersionUE4 = arg1
            this.fileVersionUE5 = arg2
        }
    }

    public get value(): number {
        return this.fileVersionUE5 >= EUnrealEngineObjectUE5Version.INITIAL_VERSION ? this.fileVersionUE5 : this.fileVersionUE4
    }

    public set value(v: number) {
        if (v >= EUnrealEngineObjectUE5Version.INITIAL_VERSION) {
            this.fileVersionUE5 = v
        } else {
            this.fileVersionUE4 = v
        }
    }

    public static createUE4Version(version: number) {
        return new FPackageFileVersion(version, 0)
    }
}