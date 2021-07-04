import { FVector4 } from "./FVector4";
import { FVector } from "./FVector";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Represents an UE4 FMatix
 * @implements {IStructType}
 */
export declare class FMatrix implements IStructType {
    /**
     * Values
     * @type {Array<Array<number>>}
     * @public
     */
    m: number[][];
    /**
     * Homogeneous transform
     * @param {FVector4} p Vector to transform
     * @returns {FVector4} Transformed vector
     * @public
     */
    transformFVector4(p: FVector4): FVector4;
    /**
     * Transform a direction vector - will not take into account translation part of the FMatrix
     * If you want to transform a surface normal (or plane) and correctly account for non-uniform scaling you should use transformByUsingAdjointT
     * @param {FVector4} v Vector to transform
     * @returns {FVector4} Transformed vector
     * @public
     */
    transformVector(v: FVector): FVector4;
    /**
     * Gets a transposed representation of current instance
     * @type {FMatrix}
     * @public
     */
    get transposed(): FMatrix;
    /**
     * The origin of the co-ordinate system
     * @type {FVector}
     * @public
     */
    get origin(): FVector;
    /**
     * Get a textual representation of the vector
     * @returns {string} Text describing the vector
     * @public
     */
    toString(): string;
    /**
     * Turns this into string
     * @returns {any}
     * @public
     */
    toJson(): any;
}
