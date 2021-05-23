import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
import { UObject } from "./UObject";

export class UScriptStruct extends UStruct {
    useClassProperties = false
    private field = null

    set structClass(value: any) {
        if (value == null)
            return
        this.field = new value()
        if (this.superStruct)
            return
        const superclass = value
        if (superclass && !(superclass instanceof UObject)) {
            this.superStruct = new UScriptStruct(superclass)
        }
    }

    get structClass() {
        return this.field
    }

    constructor(name: FName)
    constructor(clazz: any, name: FName)
    constructor(x?: any, y?: any) {
        super()
        if (!y) {
            this.name = x?.text || FName.NAME_None
        } else {
            this.name = (!(y instanceof FName) ? FName.dummy(x.name, 0) || FName.NAME_None : y).text
            this.structClass = x
            this.useClassProperties = true
        }
    }
}