import { IPropertyHolder } from "./IPropertyHolder";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Lazy } from "../../../util/Lazy";
import { UStruct } from "../exports/UStruct";
import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import { MissingSchemaException, ParserException } from "../../../exceptions/Exceptions";
import { UScriptStruct } from "../exports/UScriptStruct";
import { deserializeUnversionedProperties } from "../../objects/uobject/serialization/UnversionedPropertySerialization";
import { deserializeVersionedTaggedProperties } from "../exports/UObject";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { IStructType } from "./UScriptStruct";

/**
 * Fallback for UScriptStruct
 * @implements {IStructType}
 * @implements {IPropertyHolder}
 */
export class FStructFallback implements IStructType, IPropertyHolder {
    /**
     * Properties
     * @type {Array<FPropertyTag>}
     * @public
     */
    public properties: FPropertyTag[] = []

    /**
     * Creates instance using FAssetArchive, Lazy<UStruct> & FName
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {Lazy<UStruct>} struct Struct to use
     * @param {FName} structName Struct name to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, struct: Lazy<UStruct>, structName: FName)

    /**
     * Creates instance using FAssetArchive & FName
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {FName} structName Struct name to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, structName: FName)

    /**
     * Creates instance using Array<FPropertyTag>
     * @param {Array<FPropertyTag>} properties Properties
     * @constructor
     * @public
     */
    constructor(properties: FPropertyTag[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (Array.isArray(x)) {
            this.properties = x
        } else if (x instanceof FAssetArchive && z == null) {
            return new FStructFallback(x, new Lazy(() => {
                let struct = x.provider?.mappingsProvider?.getStruct(y)
                if (struct == null) {
                    if (x.useUnversionedPropertySerialization) {
                        throw new MissingSchemaException(`Unknown struct ${y}`)
                    }
                    struct = new UScriptStruct(y)
                }
                return struct
            }), y)
        } else {
            const Ar = x as FAssetArchive
            this.properties = []
            if (Ar.useUnversionedPropertySerialization) {
                const structClass = y?.value
                if (structClass == null)
                    throw new MissingSchemaException(`Unknown struct ${z}`)
                deserializeUnversionedProperties(this.properties, structClass, Ar)
            } else {
                deserializeVersionedTaggedProperties(this.properties, Ar)
            }
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        this.properties.forEach((it) => it.serialize(Ar, true))
        const entry = FName.getByNameMap("None", Ar.nameMap)
        if (entry == null)
            throw new ParserException("NameMap must contain \"None\"", Ar)
        Ar.writeFName(entry)
    }

    /**
     * Sets a property
     * @param {string} name Name of the property
     * @param {any} value Value of the property
     * @returns {void}
     * @public
     */
    set<T>(name: string, value: T) {
        if (this.getOrNull<T>(name) != null)
            this.properties.find(it => it.name.text === name).setTagTypeValue(value)
    }

    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {?any} Property or null
     * @public
     */
    getOrNull<T>(name: string): T | undefined {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue()
    }

    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {any} Property
     * @throws {TypeError} If property doesn't exist
     * @public
     */
    get<T>(name: string): T {
        const val = this.getOrNull(name)
        if (val == null)
            throw new TypeError(`${name} must not be null.`)
        return val as T
    }

    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson(): any {
        const obj = {}
        this.properties.forEach((it) => obj[it.name.text] = it.prop?.toJsonValue())
        return obj
    }
}