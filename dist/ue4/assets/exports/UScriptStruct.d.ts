import { UStruct } from "./UStruct";
import { FName } from "../../objects/uobject/FName";
export declare class UScriptStruct extends UStruct {
    useClassProperties: boolean;
    private field0;
    private field1;
    set structClass(value: any);
    get rawStructClass(): any;
    get structClass(): any;
    constructor();
    constructor(name: FName);
    constructor(clazz: any, name?: FName);
}
