import { IPropertyHolder } from "../objects/IPropertyHolder";
import { UStruct } from "./UStruct";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";

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

    }

    getOrDefault<T>(name: string, dflt: T) {

    }

    getOrNull<T>(name: string): T {
        const prop = this.properties.find(p => p.name.text === name)
        return prop as unknown as T
    }
}