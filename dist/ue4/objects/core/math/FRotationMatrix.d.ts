import { FRotationTranslationMatrix } from "./FRotationTranslationMatrix";
import { FRotator } from "./FRotator";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Represents an UE4 FRotationMatrix
 * @extends {FRotationTranslationMatrix}
 * @implements {IStructType}
 */
export declare class FRotationMatrix extends FRotationTranslationMatrix implements IStructType {
    /**
     * Constructor
     * @param {FRotator} rot Rotation to use
     * @constructor
     * @public
     */
    constructor(rot: FRotator);
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
