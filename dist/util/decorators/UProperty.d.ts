import "reflect-metadata";
export declare function UProperty(data?: IUProperty): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function getUProperty(target: any, propertyKey: string): any;
export interface IUProperty {
    name?: string;
    skipPrevious?: number;
    skipNext?: number;
    arrayDim?: number;
    isEnumAsByte?: boolean;
    innerType?: any;
    valueType?: any;
}
