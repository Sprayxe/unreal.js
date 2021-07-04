"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UScriptStruct = void 0;
const UStruct_1 = require("./UStruct");
const FName_1 = require("../../objects/uobject/FName");
const Lazy_1 = require("../../../util/Lazy");
const ObjectTypeRegistry_1 = require("../ObjectTypeRegistry");
class UScriptStruct extends UStruct_1.UStruct {
    constructor(x, y) {
        super();
        this.useClassProperties = false;
        this.field0 = null;
        this.field1 = null;
        if (x instanceof FName_1.FName) {
            this.name = x?.text || FName_1.FName.NAME_None.text;
        }
        else if (x) {
            this.name = (!(y instanceof FName_1.FName) ? FName_1.FName.dummy(ObjectTypeRegistry_1.ObjectTypeRegistry.unprefix(x.name, true)) : y).text;
            this.structClass = x;
            this.useClassProperties = true;
        }
        else {
            this.name = FName_1.FName.NAME_None.text;
        }
    }
    set structClass(value) {
        if (value == null)
            return;
        this.field1 = value;
        this.field0 = new value();
        if (this.superStruct)
            return;
        const superclass = value.__proto__;
        if (superclass && superclass.toString() !== "function () { [native code] }" && superclass.name !== "UObject") {
            this.superStruct = new Lazy_1.Lazy(() => new UScriptStruct(superclass));
        }
    }
    get rawStructClass() {
        return this.field1;
    }
    get structClass() {
        return this.field0;
    }
}
exports.UScriptStruct = UScriptStruct;
