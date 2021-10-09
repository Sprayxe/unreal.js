import "reflect-metadata";

const UPropertyMetadataKey = Symbol("UProperty")

export function UProperty(data: IUProperty = defaultData) {
    return Reflect.metadata(UPropertyMetadataKey, data)
}

export function getUProperty(target: any, propertyKey: string) {
    return Reflect.getMetadata(UPropertyMetadataKey, target, propertyKey);
}


export interface IUProperty {
    name?: string
    skipPrevious?: number
    skipNext?: number
    arrayDim?: number
    isEnumAsByte?: boolean
    innerType?: any
    valueType?: any
}

const defaultData: IUProperty = {
    name: "",
    skipPrevious: 0,
    skipNext: 0,
    arrayDim: 1,
    isEnumAsByte: true,
    innerType: null,
    valueType: null
}