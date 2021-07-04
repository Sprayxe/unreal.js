import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FAssetArchive } from "../reader/FAssetArchive";
/**
 * FImplementedInterface
 */
export declare class FImplementedInterface {
    /**
     * The interface class
     * @type {FPackageIndex}
     * @public
     */
    clazz: FPackageIndex;
    /**
     * The pointer offset of the interface's vtable
     * @type {number}
     * @public
     */
    pointerOffset: number;
    /**
     * Whether or not this interface has been implemented via K2
     * @type {boolean}
     * @public
     */
    bImplementedByK2: boolean;
    /**
     * Creates an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
}
/**
 * Represents an UE4 Class
 * @extends {UStruct}
 */
export declare class UClass extends UStruct {
    /**
     * Creates an instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Used to check if the class was cooked or not
     * @type {boolean}
     * @public
     */
    bCooked: boolean;
    /**
     * Class flags; See EClassFlags for more information
     * @type {number}
     * @public
     */
    classFlags: number;
    /**
     * The required type for the outer of instances of this class
     * @type {number}
     * @public
     */
    classWithin: FPackageIndex;
    /**
     * This is the blueprint that caused the generation of this class, or null if it is a native compiled-in class
     * @type {FPackageIndex}
     * @public
     */
    classGeneratedBy: FPackageIndex;
    /**
     * Which Name.ini file to load Config variables out of
     * @type {FName}
     * @public
     */
    classConfigName: FName;
    /**
     * The class default object; used for delta serialization and object initialization
     * @type {FPackageIndex}
     * @public
     */
    classDefaultObject: FPackageIndex;
    /**
     * Map of all functions by name contained in this class
     * @type {FPackageIndex}
     * @public
     */
    private funcMap;
    /**
     * The list of interfaces which this class implements, along with the pointer property that is located at the offset of the interface's vtable
     * If the interface class isn't native, the property will be null
     * @type {Array<FImplementedInterface>}
     * @public
     */
    interfaces: FImplementedInterface[];
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
