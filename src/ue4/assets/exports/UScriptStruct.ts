import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
import { UObject } from "./UObject";
import { Lazy } from "../../../util/Lazy";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";

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
        if (superclass && superclass.toString() !== "function () { [native code] }" && superclass.name !== "UObject") {
            this.superStruct = new Lazy<UStruct>(() => new UScriptStruct(superclass))
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
            this.name = (!(y instanceof FName) ? FName.dummy(ObjectTypeRegistry.unprefix(x.name, true)) : y).text
            this.structClass = x
            this.useClassProperties = true
        } else {
            this.name = FName.NAME_None.text
        }
    }
}
