import { IPropertyHolder } from "../objects/IPropertyHolder";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FName } from "../../objects/uobject/FName";
import { ParserException } from "../../../exceptions/Exceptions";
import { deserializeUnversionedProperties } from "../../objects/uobject/UnversionedPropertySerialization";
import { Locres } from "../../locres/Locres";
import { StringBuilder } from "../../../util/StringBuilder";

export class UObject extends IPropertyHolder {
    name: string = ""
    outer: UObject = null
    clazz: any = null
    template: UObject = null
    properties: FPropertyTag[] = []
    objectGuid: FGuid = null
    flags = 0

    export: FObjectExport
    get owner(): Package {
        let current = this.outer
        let next = current?.outer
        while (next != null) {
            current = next
            next = current.outer
        }
        return current as unknown as Package
    }

    get exportType() {
        return this.clazz?.name || UObject.name
    }

    constructor(properties: FPropertyTag[] = []) {
        super()
        this.properties = properties
    }

    set<T>(name: string, value: T) {
        if (this.getOrNull(name))
            return this.properties.find(it => it.name.text === name)?.setTagTypeValue(value)
    }

    getOrDefault<T>(name: string, dflt: T) {
        const value: T = this.getOrNull(name)
        return value || dflt
    }

    getOrNull<T>(name: string): T {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue()
    }

    get<T>(name: string): T {
        const val = this.getOrNull<T>(name)
        if (!val)
            throw new Error(`${name} must be not-null`)
        return val
    }

    deserialize(Ar: FAssetArchive, validPos: number) {
        this.properties = []
        if (typeof((this as any).interfaces) === "undefined") {
            if (Ar.useUnversionedPropertySerialization) {
                this.properties = deserializeUnversionedProperties(this.properties, this.clazz, Ar)
            } else {
                this.properties = deserializeVersionedTaggedProperties(this.properties, Ar)
            }
        }
        if (Ar.pos + 4 <= validPos && Ar.readBoolean() && Ar.pos + 16 <= validPos)
            this.objectGuid = new FGuid(Ar)
    }

    serialize(Ar: FAssetArchiveWriter) {
        serializeProperties(Ar, this.properties)
        Ar.writeBoolean(!!this.objectGuid)
        this.objectGuid?.serialize(Ar)
    }

    toJson(locres: Locres = null): any {
        const ob = {}
        this.properties.forEach((pTag) => {
            const tagValue = pTag.prop
            if (!tagValue)
                return
            ob[pTag.name.text] = tagValue
        })
        return ob
    }

    clearFlags(newFlags: number) {
        this.flags = this.flags & newFlags
    }

    hasAnyFlags(flagsToCheck: number) {
        return (this.flags & flagsToCheck) !== 0
    }

    getFullName(stopOuter: UObject, includeClassPackage: boolean)
    getFullName(stopOuter: UObject, resultString: StringBuilder, includeClassPackage: boolean)
    getFullName(x?: any, y?: any, z?: any) {
        if (typeof y === "boolean") {
            const result = new StringBuilder(128)
            this.getFullName(x, result, y)
            return result.toString()
        } else {
            if (x) {
                y.append(this.clazz?.getPathName())
            } else {
                y.append(this.clazz?.name)
            }
            y.append(" ")
            this.getPathName(x, y)
        }
    }

    getPathName(stopouter?: UObject)
    getPathName(stopouter: UObject, resultString: StringBuilder)
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

    toString() {
        return this.name
    }
}

export function deserializeVersionedTaggedProperties(properties: FPropertyTag[], Ar: FAssetArchive) {
    while (true) {
        const tag = new FPropertyTag(Ar, true)
        if (tag.name.isNone())
            break
        properties.push(tag)
    }
    return properties
}

export function serializeProperties(Ar: FAssetArchiveWriter, properties: FPropertyTag[]) {
    properties.forEach((it) => it.serialize(Ar, true))
    const nameMap = FName.getByNameMap("None", Ar.nameMap)
    if (!nameMap)
        throw ParserException("NameMap must contain \"None\"")
    Ar.writeFName(nameMap)
}

