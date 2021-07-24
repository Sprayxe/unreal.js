import { IPropertyHolder } from "../objects/IPropertyHolder";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FName } from "../../objects/uobject/FName";
import { ParserException } from "../../../exceptions/Exceptions";
import { deserializeUnversionedProperties } from "../../objects/uobject/serialization/UnversionedPropertySerialization";
import { Locres } from "../../locres/Locres";
import { StringBuilder } from "../../../util/StringBuilder";
import { camelCase } from "lodash"
import { Lazy } from "../../../util/Lazy";
import { EObjectFlags } from "../../objects/uobject/EObjectFlags";

/**
 * UE4 Asset Object
 * @implements {IPropertyHolder}
 */
export class UObject implements IPropertyHolder {
    /**
     * Object name
     * @type {string}
     * @public
     */
    name: string = ""

    /**
     * Outer object of object
     * @type {UObject}
     * @public
     */
    outer: UObject = null

    /**
     * Object class
     * @type {any}
     * @public
     */
    clazz: any = null

    /**
     * Template of object
     * @type {Lazy<UObject>}
     * @public
     */
    template: Lazy<UObject> = null

    /**
     * Object properties
     * @type {Array<FPropertyTag>}
     * @public
     */
    properties: FPropertyTag[] = []

    /**
     * Object GUID
     * @type {FGuid}
     * @public
     */
    objectGuid: FGuid = null

    /**
     * Object flags
     * @type {number}
     * @public
     */
    flags = 0

    /**
     * Object export
     * @type {FObjectExport}
     * @public
     */
    export: FObjectExport

    /**
     * Package that owns this object
     * @type {Package}
     * @public
     */
    get owner(): Package {
        let current = this.outer
        let next = current?.outer
        while (next != null) {
            current = next
            next = current.outer
        }
        return current as unknown as Package
    }

    /**
     * Type of export
     * @type {string}
     * @public
     */
    get exportType(): string {
        return this.clazz?.name || UObject.name
    }

    /**
     * Creates an instance
     * @param {?Array<FPropertyTag>} properties Properties to assign
     * @constructor
     * @public
     */
    constructor(properties: FPropertyTag[] = []) {
        this.properties = properties
    }

    /**
     * Sets a property
     * @param {string} name Name of property
     * @param {any} value Value of property
     * @returns {void}
     * @public
     */
    set<T>(name: string, value: T) {
        if (this.getOrNull(name))
            return this.properties.find(it => it.name.text === name)?.setTagTypeValue(value)
    }

    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @param {any} dflt Default value to return
     * @returns {any} Result
     * @public
     */
    getOrDefault<T>(name: string, dflt: T) {
        const value: T = this.getOrNull(name)
        return value || dflt
    }

    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @returns {?any} Result or null
     * @public
     */
    getOrNull<T>(name: string): T {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue()
    }

    /**
     * Gets a property
     * @param {string} name Name of property to find
     * @returns {any} Result
     * @throws {Error} If property doesn't exist
     * @public
     */
    get<T>(name: string): T {
        const val = this.getOrNull<T>(name)
        if (!val)
            throw new Error(`${name} must be not-null`)
        return val
    }

    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar Reader to use
     * @param {number} validPos Valid position of Reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        this.properties = []
        if (Object.getPrototypeOf(this)?.constructor?.name !== "UClass") {
            if (Ar.useUnversionedPropertySerialization) {
                if (this.clazz == null) throw new ParserException("Found unversioned properties but object does not have a class.", Ar);
                deserializeUnversionedProperties(this.properties, this.clazz, Ar)
            } else {
                deserializeVersionedTaggedProperties(this.properties, Ar)
            }
        }
        if ((EObjectFlags.RF_ClassDefaultObject & this.flags) === 0 && Ar.readBoolean())
            this.objectGuid = new FGuid(Ar)
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        serializeProperties(Ar, this.properties)
        Ar.writeBoolean(!!this.objectGuid)
        this.objectGuid?.serialize(Ar)
    }

    /**
     * Turns this object into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres: Locres = null): any {
        const ob = {}
        for (const property of this.properties) {
            const tagValue = property.prop
            if (!tagValue)
                return
            ob[camelCase(property.name.text)] = tagValue.toJsonValue(locres)
        }
        return ob
    }

    /**
     * Clears flags
     * @param {number} newFlags New flags to set
     * @returns {void}
     * @public
     */
    clearFlags(newFlags: number) {
        this.flags = this.flags & newFlags
    }

    /**
     * Checks if this has provided flags
     * @param {number} flagsToCheck Flags to check for
     * @returns {boolean} Whether if flags matched or not
     * @public
     */
    hasAnyFlags(flagsToCheck: number) {
        return (this.flags & flagsToCheck) !== 0
    }

    /**
     * Gets full name
     * @param {UObject} stopOuter Outer object
     * @param {boolean} includeClassPackage Whether to include class
     * @returns {string} Full name
     * @public
     */
    getFullName(stopOuter: UObject, includeClassPackage: boolean)

    /**
     * Gets full name with an existing string builder
     * @param {UObject} stopOuter Outer object
     * @param {StringBuilder} resultString String builder to use
     * @param {boolean} includeClassPackage Whether to include class
     * @returns {string} Full name
     * @public
     */
    getFullName(stopOuter: UObject, resultString: StringBuilder, includeClassPackage: boolean)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    getFullName(x?: any, y?: any, z?: any) {
        if (typeof y === "boolean") {
            const result = new StringBuilder(128)
            this.getFullName(x, result, y)
            return result.toString()
        } else {
            if (z) {
                y.append(this.clazz?.getPathName())
            } else {
                y.append(this.clazz?.name)
            }
            y.append(" ")
            return this.getPathName(x, y)
        }
    }

    /**
     * Gets path name
     * @param {UObject} stopouter Outer object
     * @returns {string} Path name
     * @public
     */
    getPathName(stopouter?: UObject)

    /**
     * Gets path name with existing string builder instance
     * @param {UObject} stopouter Outer object
     * @param {StringBuilder} resultString String builder to use
     * @returns {string} Path name
     * @public
     */
    getPathName(stopouter: UObject, resultString: StringBuilder)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    getPathName(x?: any, y?: any) {
        if (!y) {
            const result = new StringBuilder()
            this.getPathName(x, result)
            return result.toString()
        } else {
            if (this !== x) {
                const objOuter = this.outer
                if (objOuter && objOuter !== x) {
                    objOuter.getPathName(x, y)
                    if (objOuter.outer instanceof Package) {
                        y.append(":")
                    } else {
                        y.append(".")
                    }
                }
                y.append(this.name)
            } else {
                y.append("None")
            }
        }
    }

    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return this.name
    }
}

/**
 * Deserializes versioned tagged properties
 * @param {Array<FPropertyTag>} properties Array to assign properties to
 * @param {FAssetArchive} Ar Reader to use
 * @returns {void}
 * @export
 */
export function deserializeVersionedTaggedProperties(properties: FPropertyTag[], Ar: FAssetArchive) {
    while (true) {
        const tag = new FPropertyTag(Ar, true)
        if (tag.name.isNone())
            break
        properties.push(tag)
    }
}

/**
 * Serializes properties
 * @param {FAssetArchiveWriter} Ar Writer to use
 * @param {Array<FPropertyTag>} properties Array with properties to serialize
 * @returns {void}
 * @export
 */
export function serializeProperties(Ar: FAssetArchiveWriter, properties: FPropertyTag[]) {
    properties.forEach((it) => it.serialize(Ar, true))
    const nameMap = FName.getByNameMap("None", Ar.nameMap)
    if (!nameMap)
        throw new ParserException("NameMap must contain \"None\"", Ar)
    Ar.writeFName(nameMap)
}

