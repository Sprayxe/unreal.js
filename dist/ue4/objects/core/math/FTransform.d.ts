import { FVector } from "./FVector";
import { FQuat } from "./FQuat";
import { FArchive } from "../../../reader/FArchive";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Represent an UE4 FTransform
 * @implements {IStructType}
 */
export declare class FTransform implements IStructType {
    /**
     * Rotation value
     * @type {FQuat}
     * @public
     */
    rotation: FQuat;
    /**
     * Translation value
     * @type {FVector}
     * @public
     */
    translation: FVector;
    /**
     * Scale 3D value
     * @type {FVector}
     * @public
     */
    scale3D: FVector;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FQuat} rotation Rotation to use
     * @param {FVector} translation Translation to use
     * @param {FVector} scale3D Scale(3D) to use
     * @constructor
     * @public
     */
    constructor(rotation: FQuat, translation: FVector, scale3D: FVector);
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
