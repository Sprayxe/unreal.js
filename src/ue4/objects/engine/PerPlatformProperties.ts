import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * FPerPlatformInt
 * @implements {IStructType}
 */
export class FPerPlatformInt implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    public cooked: boolean

    /**
     * value
     * @type {number}
     * @public
     */
    public value: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readInt32()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeInt32(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}

/**
 * FPerPlatformFloat
 * @implements {IStructType}
 */
export class FPerPlatformFloat implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    public cooked: boolean

    /**
     * value
     * @type {number}
     * @public
     */
    public value: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readFloat32()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeFloat32(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}

/**
 * FPerPlatformBool
 * @implements {IStructType}
 */
export class FPerPlatformBool implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    public cooked: boolean

    /**
     * value
     * @type {boolean}
     * @public
     */
    public value: boolean

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {boolean} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: boolean)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.cooked = x.readBoolean()
            this.value = x.readBoolean()
        } else {
            this.cooked = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        Ar.writeBoolean(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            cooked: this.cooked,
            value: this.value
        }
    }
}