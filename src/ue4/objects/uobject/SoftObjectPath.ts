import { FName } from "./FName";
import { Package } from "../../assets/Package";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { UObject } from "../../assets/exports/UObject";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * A struct that contains a string reference to an object, either a top level asset or a subobject.
 * This can be used to make soft references to assets that are loaded on demand.
 * This is stored internally as an FName pointing to the top level asset (/package/path.assetname) and an option a string subobject path.
 * If the MetaClass metadata is applied to a FProperty with this the UI will restrict to that type of asset.
 */
export class FSoftObjectPath implements IStructType {
    /** Asset path, patch to a top level object in a package. This is /package/path.assetname */
    assetPathName: FName

    /** Optional FString for subobject within an asset. This is the sub path after the : */
    subPathString: string
    owner: Package = null

    constructor()
    constructor(Ar: FArchive)
    constructor(assetPathName: FName, subPathString: string)
    constructor(x?: any, y?: any) {
        if (!x) {
            this.assetPathName = FName.NAME_None
            this.subPathString = ""
        } else {
            if (x instanceof FArchive) {
                this.assetPathName = x.readFName()
                this.subPathString = x.readString()
            } else {
                this.assetPathName = x
                this.subPathString = y
            }
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeFName(this.assetPathName)
        Ar.writeString(this.subPathString)
    }

    toString() {
        if (this.subPathString) {
            return this.assetPathName.isNone() ? "" : this.assetPathName.toString()
        } else {
            `${this.assetPathName}:${this.subPathString}`
        }
    }

    load<T extends UObject>() {
        return this.owner?.provider?.loadObject<T>(this)
    }

    toJson(): any {
        return {
            assetPathName: this.assetPathName.text,
            subPathString: this.subPathString
        }
    }
}

export class FSoftClassPath extends FSoftObjectPath {
    constructor()
    constructor(Ar: FArchive)
    constructor(assetPathName: FName, subPathString: string)
    constructor(x?: any, y?: any) {
        if (x) {
            if (x instanceof FArchive) {
                super(x)
            } else {
                super(x, y)
            }
        } else {
            super()
        }
    }
}