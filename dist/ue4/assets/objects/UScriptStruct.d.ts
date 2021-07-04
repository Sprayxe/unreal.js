import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { ReadType } from "./FProperty";
/**
 * UScriptStruct
 */
export declare class UScriptStruct {
    /**
     * Name of struct
     * @type {FName}
     * @public
     */
    structName: FName;
    /**
     * Type of struct
     * @type {IStructType}
     * @public
     */
    structType: IStructType;
    /**
     * Creates an instance from reading
     * @param {FAssetArchive} Ar Reader to use
     * @param {PropertyType} typeData Type data
     * @param {ReadType} type Read type
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType);
    /**
     * Creates an instance using FName and any
     * @param {FName} structName Name of struct
     * @param {IStructType} structType Type of struct
     * @constructor
     * @public
     */
    constructor(structName: FName, structType: IStructType);
}
/**
 * Represents a struct type
 */
export interface IStructType {
    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson(): any;
}
