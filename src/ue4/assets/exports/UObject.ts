import { IPropertyHolder } from "../objects/IPropertyHolder";
import { UStruct } from "./UStruct";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";

export class UObject extends IPropertyHolder {
    name: string = ""
    outer: UObject = null
    clazz: any/*UStruct*/ = null
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

    set<T>(name: String, value: T) {

    }

    getOrNull<T>(name: string, clazz?: T)/*: T*/ {
        //return this.properties[0]
    }
}