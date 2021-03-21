import { UStruct } from "./UStruct";
import { UFunction } from "./UFunction";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UnrealMap } from "../../../util/UnrealMap";

export class UClass extends UStruct {
    constructor() {
        super()
    }

    /** Used to check if the class was cooked or not */
    bCooked = false

    /** Class flags; See EClassFlags for more information */
    classFlags = 0

    /** The required type for the outer of instances of this class */
    classWithin: FPackageIndex

    /** This is the blueprint that caused the generation of this class, or null if it is a native compiled-in class */
    classGeneratedBy: FPackageIndex

    /** Which Name.ini file to load Config variables out of */
    classConfigName: FName

    /** The class default object; used for delta serialization and object initialization */
    classDefaultObject: FPackageIndex

    /** Map of all functions by name contained in this class */
    private funcMap: UnrealMap<FName, UFunction>

    /**
     * The list of interfaces which this class implements, along with the pointer property that is located at the offset of the interface's vtable.
     * If the interface class isn't native, the property will be null.
     */
    interfaces: FImplementedInterface[]

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)

        // serialize the function map
        this.funcMap = Ar.readTMap(null, () => {
            return {
                key: Ar.readFName(),
                value: Ar.readObject()
            }
        })

        // Class flags first.
        this.classFlags = Ar.readUInt32()

        // Variables.
        this.classWithin = new FPackageIndex(Ar)
        this.classConfigName = Ar.readFName()

        this.classGeneratedBy = new FPackageIndex(Ar)

        // Load serialized interface classes
        this.interfaces = Ar.readArray(() => new FImplementedInterface(Ar))

        const bDeprecatedScriptOrder = Ar.readBoolean()
        const dummy = Ar.readFName()

        if (Ar.ver >= 241 /*VER_UE4_ADD_COOKED_TO_UCLASS*/) {
            this.bCooked = Ar.readBoolean()
        }

        // Defaults.
        this.classDefaultObject = new FPackageIndex(Ar)
    }
}

export class FImplementedInterface {
    /** the interface class */
    clazz: FPackageIndex
    /** the pointer offset of the interface's vtable */
    pointerOffset: number
    /** whether or not this interface has been implemented via K2 */
    bImplementedByK2: boolean

    constructor(Ar: FAssetArchive) {
        this.clazz = new FPackageIndex(Ar)
        this.pointerOffset = Ar.readInt32()
        this.bImplementedByK2 = Ar.readBoolean()
    }
}