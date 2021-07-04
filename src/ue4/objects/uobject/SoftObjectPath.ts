import { FName } from "./FName";
import { Package } from "../../assets/Package";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { UObject } from "../../assets/exports/UObject";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * A struct that contains a string reference to an object, either a top level asset or a subobject
 * This can be used to make soft references to assets that are loaded on demand
 * This is stored internally as an FName pointing to the top level asset (/package/path.assetname) and an option a string subobject path
 * If the MetaClass metadata is applied to a FProperty with this the UI will restrict to that type of asset
 * @implements {IStructType}
 */
export class FSoftObjectPath implements IStructType {
    /**
     * Asset path, patch to a top level object in a package. This is /package/path.assetname
     * @type {FName}
     * @public
     */
    assetPathName: FName

    /**
     * Optional FString for subobject within an asset. This is the sub path after the :
     * @type {string}
     * @public
     */
    subPathString: string

    /**
     * Owner
     * @type {Package}
     * @public
     */
    owner: Package = null

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FName} assetPathName Asset path name to use
     * @param {string} subPathString Sub path string to use
     */
    constructor(assetPathName: FName, subPathString: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeFName(this.assetPathName)
        Ar.writeString(this.subPathString)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        if (this.subPathString === "") {
            return this.assetPathName.isNone() ? "" : this.assetPathName.text
        } else {
            return `${this.assetPathName.text}:${this.subPathString}`
        }
    }

    /**
     * Loads this
     * @returns {UObject} Object
     * @public
     */
    load<T extends UObject>(): T {
        return this.owner?.provider?.loadObject<T>(this)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            assetPathName: this.assetPathName.text,
            subPathString: this.subPathString
        }
    }
}

/**
 * FSoftClassPath
 * @extends {FSoftObjectPath}
 */
export class FSoftClassPath extends FSoftObjectPath {
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FName} assetPathName Asset path name to use
     * @param {string} subPathString Sub path string to use
     */
    constructor(assetPathName: FName, subPathString: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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