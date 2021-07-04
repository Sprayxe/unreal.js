import { FMatrix } from "./FMatrix";
import { FRotator } from "./FRotator";
import { FVector } from "./FVector";
/**
 * Represents an UE4 FRotationTranslationMatrix
 * @extends {FMatrix}
 */
export declare class FRotationTranslationMatrix extends FMatrix {
    /**
     * Constructor
     * @param {FRotator} rot Rotation to use
     * @param {FVector} origin Translation to use
     * @constructor
     * @public
     */
    constructor(rot: FRotator, origin: FVector);
}
