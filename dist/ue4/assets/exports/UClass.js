"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UClass = exports.FImplementedInterface = void 0;
const UStruct_1 = require("./UStruct");
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
/**
 * FImplementedInterface
 */
class FImplementedInterface {
    /**
     * Creates an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.clazz = new ObjectResource_1.FPackageIndex(Ar);
        this.pointerOffset = Ar.readInt32();
        this.bImplementedByK2 = Ar.readBoolean();
    }
}
exports.FImplementedInterface = FImplementedInterface;
/**
 * Represents an UE4 Class
 * @extends {UStruct}
 */
class UClass extends UStruct_1.UStruct {
    /**
     * Creates an instance
     * @constructor
     * @public
     */
    constructor() {
        super();
        /**
         * Used to check if the class was cooked or not
         * @type {boolean}
         * @public
         */
        this.bCooked = false;
        /**
         * Class flags; See EClassFlags for more information
         * @type {number}
         * @public
         */
        this.classFlags = 0;
        /**
         * The required type for the outer of instances of this class
         * @type {number}
         * @public
         */
        this.classWithin = null;
        /**
         * This is the blueprint that caused the generation of this class, or null if it is a native compiled-in class
         * @type {FPackageIndex}
         * @public
         */
        this.classGeneratedBy = null;
        /**
         * Which Name.ini file to load Config variables out of
         * @type {FName}
         * @public
         */
        this.classConfigName = null;
        /**
         * The class default object; used for delta serialization and object initialization
         * @type {FPackageIndex}
         * @public
         */
        this.classDefaultObject = null;
        /**
         * Map of all functions by name contained in this class
         * @type {FPackageIndex}
         * @public
         */
        this.funcMap = null;
        /**
         * The list of interfaces which this class implements, along with the pointer property that is located at the offset of the interface's vtable
         * If the interface class isn't native, the property will be null
         * @type {Array<FImplementedInterface>}
         * @public
         */
        this.interfaces = [];
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        // serialize the function map
        this.funcMap = Ar.readTMap(null, () => {
            return {
                key: Ar.readFName(),
                value: Ar.readObject()
            };
        });
        // Class flags first.
        this.classFlags = Ar.readUInt32();
        // Variables.
        this.classWithin = new ObjectResource_1.FPackageIndex(Ar);
        this.classConfigName = Ar.readFName();
        this.classGeneratedBy = new ObjectResource_1.FPackageIndex(Ar);
        // Load serialized interface classes
        this.interfaces = Ar.readArray(() => new FImplementedInterface(Ar));
        const bDeprecatedScriptOrder = Ar.readBoolean();
        const dummy = Ar.readFName();
        if (Ar.ver >= 241 /*VER_UE4_ADD_COOKED_TO_UCLASS*/) {
            this.bCooked = Ar.readBoolean();
        }
        // Defaults.
        this.classDefaultObject = new ObjectResource_1.FPackageIndex(Ar);
    }
}
exports.UClass = UClass;
