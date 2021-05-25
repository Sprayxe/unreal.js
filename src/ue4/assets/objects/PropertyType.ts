import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import {
    FArrayProperty,
    FByteProperty,
    FMapProperty,
    FPropertySerialized,
    FSetProperty,
    FStructProperty
} from "../exports/UStruct";
import { Lazy } from "../../../util/Lazy";

export class PropertyType {
    type: FName
    structName = FName.NAME_None
    bool: boolean = false
    enumName = FName.NAME_None
    isEnumAsByte: boolean = true
    innerType: PropertyType = null
    valueType: PropertyType = null
    structClass: Lazy<any> = null
    enumClass: any = null

    constructor()
    constructor(type: FName)
    constructor(JsonObject: any)
    constructor(tag: FPropertyTag)
    constructor(prop: FPropertySerialized)
    constructor(x?: any) {
        if (!x) {
            this.type = FName.NAME_None
        } else if (x instanceof FName) {
            this.type = x
        } else if (x instanceof FPropertyTag) {
            this.type = x.type
            this.structName = x.structName
            this.bool = x.boolVal
            this.enumName = x.enumName
            this.innerType = new PropertyType(x.innerType)
            this.valueType = new PropertyType(x.valueType)
        } else if (x instanceof FPropertySerialized) {
            this.type = FName.NAME_None
            if (x instanceof FArrayProperty) {
                this.innerType = x.inner ? new PropertyType(x.inner) : null
            } else if (x instanceof FByteProperty) {
                this.enumName = x.enum.name
            } else if (x instanceof FMapProperty) {
                this.innerType = x.keyProp ? new PropertyType(x.keyProp) : null
                this.valueType = x.valueProp ? new PropertyType(x.keyProp) : null
            } else if (x instanceof FSetProperty) {
                this.innerType = x.elementProp ? new PropertyType(x.elementProp) : null
            } else if (x instanceof FStructProperty) {
                this.structClass = new Lazy<any>(() => x.struct)
                this.structName = FName.dummy(this.structClass?.value?.name, 0) || FName.NAME_None
            }
        }
    }

    toString() {
        return this.type.text
    }
}