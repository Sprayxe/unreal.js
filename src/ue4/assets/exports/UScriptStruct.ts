import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
import { UObject } from "./UObject";

export class UScriptStruct extends UStruct {
    useClassProperties = false
    private field0 = null
    private field1 = null

    set structClass(value: any) {
        if (value == null)
            return
        this.field1 = value
        this.field0 = new value()
        if (this.superStruct)
            return
        const superclass = value.__proto__
        if (superclass && superclass.name !== "UObject") {
            this.superStruct = new UScriptStruct(superclass)
        }
    }

    get rawStructClass() {
        return this.field1
    }

    get structClass() {
        return this.field0
    }

    constructor()
    constructor(name: FName)
    constructor(clazz: any, name?: FName)
    constructor(x?: any, y?: any) {
        super()
        if (x instanceof FName) {
            this.name = x?.text || FName.NAME_None.text
        } else if (x) {
            this.name = (!(y instanceof FName) ? FName.dummy(x.name) || FName.NAME_None : y).text
            this.structClass = x
            this.useClassProperties = true
        }
    }
}
