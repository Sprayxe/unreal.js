import { FPropertyTag } from "./FPropertyTag";
import { IStructType } from "./UScriptStruct";

export class IPropertyHolder implements IStructType {
    properties: FPropertyTag[] = []
    toJson(): any {
        return "IPropertyHolder"
    }
}