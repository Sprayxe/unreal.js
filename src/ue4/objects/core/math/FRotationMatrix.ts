import { FRotationTranslationMatrix } from "./FRotationTranslationMatrix";
import { FRotator } from "./FRotator";
import { FVector } from "./FVector";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * Represents an UE4 FRotationMatrix
 * @extends {FRotationTranslationMatrix}
 * @implements {IStructType}
 */
export class FRotationMatrix extends FRotationTranslationMatrix implements IStructType {
    /**
     * Constructor
     * @param {FRotator} rot Rotation to use
     * @constructor
     * @public
     */
    constructor(rot: FRotator) {
        super(rot, new FVector(0, 0, 0))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.m
    }
}