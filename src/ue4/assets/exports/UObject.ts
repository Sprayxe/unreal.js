import { IPropertyHolder } from "../objects/IPropertyHolder";

export class UObject extends IPropertyHolder {
    name: string = ""
    outer: UObject = null
    clazz: any = null
    template: UObject = null
    properties: [] = []
}