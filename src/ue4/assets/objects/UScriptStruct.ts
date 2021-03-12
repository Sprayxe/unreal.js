import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { ReadType } from "./FProperty";

export class UScriptStruct {
    structName: FName
    structType: any

    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType)
    constructor(structName: FName, structType: any)
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            this.structName = y.structName
            // TODO do that constructor shit
        } else {
            this.structName = x
            this.structType = y
        }
    }
}