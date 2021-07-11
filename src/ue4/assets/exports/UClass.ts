import { UStruct } from "./UStruct";
import { UFunction } from "./UFunction";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UnrealMap } from "../../../util/UnrealMap";

/**
 * FImplementedInterface
 */
export class FImplementedInterface {
    /**
     * The interface class
     * @type {FPackageIndex}
     * @public
     */
    clazz: FPackageIndex

    /**
     * The pointer offset of the interface's vtable
     * @type {number}
     * @public
     */
    pointerOffset: number

    /**
     * Whether or not this interface has been implemented via K2
     * @type {boolean}
     * @public
     */
    bImplementedByK2: boolean

    /**
     * Creates an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive) {
        this.clazz = new FPackageIndex(Ar)
        this.pointerOffset = Ar.readInt32()
        this.bImplementedByK2 = Ar.readBoolean()
    }
}

/**
 * Represents an UE4 Class
 * @extends {UStruct}
 */
export class UClass extends UStruct {
    /**
     * Creates an instance
     * @constructor
     * @public
     */
    constructor() {
        super()
    }

    /**
     * Used to check if the class was cooked or not
     * @type {boolean}
     * @public
     */
    bCooked = false

    /**
     * Class flags; See EClassFlags for more information
     * @type {number}
     * @public
     */
    classFlags = 0

    /**
     * The required type for the outer of instances of this class
     * @type {number}
     * @public
     */
    classWithin: FPackageIndex = null

    /**
     * This is the blueprint that caused the generation of this class, or null if it is a native compiled-in class
     * @type {FPackageIndex}
     * @public
     */
    classGeneratedBy: FPackageIndex = null

    /**
     * Which Name.ini file to load Config variables out of
     * @type {FName}
     * @public
     */
    classConfigName: FName = null

    /**
     * The class default object; used for delta serialization and object initialization
     * @type {FPackageIndex}
     * @public
     */
    classDefaultObject: FPackageIndex = null

    /**
     * Map of all functions by name contained in this class
     * @type {FPackageIndex}
     * @public
     */
    private funcMap: UnrealMap<FName, UFunction> = null

    /**
     * The list of interfaces which this class implements, along with the pointer property that is located at the offset of the interface's vtable
     * If the interface class isn't native, the property will be null
     * @type {Array<FImplementedInterface>}
     * @public
     */
    interfaces: FImplementedInterface[] = []

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)

        // serialize the function map
        this.funcMap = new UnrealMap<FName, UFunction>()
        const len = Ar.readInt32()
        for (let i = 0; i < len; ++i) {
            this.funcMap.set(Ar.readFName(), Ar.readObject<UFunction>())
        }

        // Class flags first.
        this.classFlags = Ar.readUInt32()

        // Variables.
        this.classWithin = new FPackageIndex(Ar)
        this.classConfigName = Ar.readFName()

        this.classGeneratedBy = new FPackageIndex(Ar)

        // Load serialized interface classes
        const interLen = Ar.readInt32()
        this.interfaces = new Array(interLen)
        for (let i = 0; i < interLen; ++i) {
            this.interfaces[i] = new FImplementedInterface(Ar)
        }

        const bDeprecatedScriptOrder = Ar.readBoolean()
        const dummy = Ar.readFName()

        if (Ar.ver >= 241 /*VER_UE4_ADD_COOKED_TO_UCLASS*/) {
            this.bCooked = Ar.readBoolean()
        }

        // Defaults.
        this.classDefaultObject = new FPackageIndex(Ar)
    }
}