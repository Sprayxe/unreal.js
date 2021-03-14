import { IPropertyHolder } from "../objects/IPropertyHolder";
import { UStruct } from "./UStruct";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UClassReal } from "./UClassReal";

export class UObject extends IPropertyHolder {
    name: string = ""
    outer: UObject = null
    clazz: UStruct = null
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
        if (!(this instanceof UClassReal)) {
            if (Ar.useUnversionedPropertySerialization) {

            }
        }
    }
}

