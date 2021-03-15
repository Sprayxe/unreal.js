import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
import { UObject } from "./UObject";

export class UScriptStruct extends UStruct {
    useClassProperties = false
    set structClass(value: any) {
        if (this.superStruct)
            return
        const superclass = Object.getPrototypeOf(Object.getPrototypeOf(value)).constructor
        if (superclass && superclass !== UObject) {
            this.superStruct = new UScriptStruct(superclass)
        }
    }

    constructor(name: FName)
    constructor(clazz: any, name: FName)
    constructor(x?: any, y?: any) {
        super()
        if (!y) {
            this.name = x.text || FName.NAME_None
        } else {
            this.name = (!(y instanceof FName) ? FName.dummy(x.name, 0) || FName.NAME_None : y).text
            this.structClass(x)
            this.useClassProperties = true
        }
    }
}