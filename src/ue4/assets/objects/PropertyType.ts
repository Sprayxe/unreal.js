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
import Long from "long";
import Collection from "@discordjs/collection";

export class PropertyType {
    type: FName
    structName = FName.NAME_None
    bool: boolean = false
    enumName = FName.NAME_None
    isEnumAsByte: boolean = true
    innerType: PropertyType = null
    valueType: PropertyType = null
    structClass: any = null
    enumClass: any

    constructor()
    constructor(JsonObject: any)
    constructor(tag: FPropertyTag)
    constructor(prop: FPropertySerialized)
    constructor(x?: any) {
        if (!x) {
            this.type = FName.NAME_None
        } else if (x instanceof FPropertyTag) {
            this.type = x.name
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
                this.structClass = x.struct
                this.structName = FName.dummy(this.structClass?.value?.name, 0) || FName.NAME_None
            }
        }
    }

    setupWithField(field: any) {
        let fieldType = field.type
        if (field.type.isArray) {
            fieldType = fieldType.componentType
        }
        let type = this.classToPropertyType(fieldType)

        /*switch (type.text) {
            case "EnumProperty":
                this.enumName = FName.dummy(fieldType.simpleName, 0)
                this.enumClass = fieldType
                break
            case "StructProperty":
                this.structName = FName.dummy(fieldType.simpleName, 0)
                this.structClass = fieldType
                break
            case "ArrayProperty":
                this.applyInner(fieldType)
                break
            case "SetProperty":
                this.applyInner(fieldType)
                break
            case "MapProperty":
                this.applyInner(fieldType)
                this.applyInner(fieldType, true)
                break
        }*/
    }

    private applyInner(field: any, applyToValue: boolean = false) {

    }

    private classToPropertyType(c: any) {
        let param: string
        if (typeof c === "boolean") {
            param = "BoolProperty"
        } else if (typeof c === "string" && c.length === 1) {
            param = "CharProperty"
        } else if (typeof c === "number" && `${c}`.includes(".")) {
            param = "DoubleProperty"
        } else if (`${c}`.includes("f") && !!parseInt(c)) {
            param = "FloatProperty"
        } else if (c) { //Byte

        } else if (c) { // Short

        } else if (typeof c === "number") {
            param = "IntProperty"
        } else if (Long.isLong(c) || typeof c === "bigint") {
            param = "Int64Property"
        } else if (c) { // UByte

        } else if (c) { // UShort

        }  else if (c) { // UInt

        } else if (c) { // ULong

        } else if (typeof c === "string") {
            param = "StrProperty"
        } else if (c instanceof FName) {
            param = "NameProperty"
        } else if (c) { // FText

        } else if (c) { // Enum

        } else if (Array.isArray(c)) {
            param = "ArrayProperty"
        } else if (c instanceof Collection) {
            param = "SetProperty"
        } else if (c instanceof Map) {
            param = "MapProperty"
        } // more
    }

    toString() {
        return this.type.text
    }
}