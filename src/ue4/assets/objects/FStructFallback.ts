import { IPropertyHolder } from "./IPropertyHolder";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Lazy } from "../../../util/Lazy";
import { UStruct } from "../exports/UStruct";
import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import { MissingSchemaException, ParserException } from "../../../exceptions/Exceptions";
import { UScriptStruct } from "../exports/UScriptStruct";
import { deserializeUnversionedProperties } from "../../objects/uobject/UnversionedPropertySerialization";
import { deserializeVersionedTaggedProperties } from "../exports/UObject";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";

export class FStructFallback extends IPropertyHolder {
    constructor(Ar: FAssetArchive, struct: Lazy<UStruct>, structName: FName)
    constructor(Ar: FAssetArchive, structName: FName)
    constructor(properties: FPropertyTag[])
    constructor(x: any, y?: any, z?: any) {
        super()
        if (Array.isArray(x)) {
            this.properties = x
        } else if (x instanceof FAssetArchive && z == null) {
            return new FStructFallback(x, new Lazy(() => {
                let struct = x.provider?.mappingsProvider?.getStruct(y)
                if (struct == null) {
                    if (x.useUnversionedPropertySerialization) {
                        throw MissingSchemaException(`Unknown struct ${y}`)
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
                    throw MissingSchemaException(`Unknown struct ${z}`)
                this.properties = deserializeUnversionedProperties(this.properties, structClass, Ar)
            } else {
                this.properties = deserializeVersionedTaggedProperties(this.properties, Ar)
            }
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        this.properties.forEach((it) => it.serialize(Ar, true))
        const entry = FName.getByNameMap("None", Ar.nameMap)
        if (entry == null)
            throw ParserException("NameMap must contain \"None\"")
        Ar.writeFName(entry)
    }

    set<T>(name: string, value: T) {
        if (this.getOrNull<T>(name) != null)
            this.properties.find(it => it.name.text === name).setTagTypeValue(value)
    }

    getOrNull<T>(name: string): T | undefined {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue()
    }

    get<T>(name: string): T {
        const val = this.getOrNull(name)
        if (val == null)
            throw new TypeError(`${name} must not be null.`)
        return val as T
    }
}