import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

export class FPerPlatformInt implements IStructType {
    public cooked: boolean
    public value: number

    constructor(Ar: FArchive)
    constructor(cooked: boolean, value: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readInt32()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeInt32(this.value)
    }

    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}

export class FPerPlatformFloat implements IStructType {
    public cooked: boolean
    public value: number

    constructor(Ar: FArchive)
    constructor(cooked: boolean, value: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readFloat32()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeFloat32(this.value)
    }

    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}

export class FPerPlatformBool implements IStructType {
    public cooked: boolean
    public value: boolean

    constructor(Ar: FArchive)
    constructor(cooked: boolean, value: boolean)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readBoolean()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeBoolean(this.value)
    }

    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}