import { FVector } from "./FVector";
import { FQuat } from "./FQuat";
import { FArchive } from "../../../reader/FArchive";
import { UProperty } from "../../../../util/decorators/UProperty";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * Represent an UE4 FTransform
 * @implements {IStructType}
 */
export class FTransform implements IStructType {
    /**
     * Rotation value
     * @type {FQuat}
     * @public
     */
    @UProperty({name: "rotation"})
    public rotation: FQuat

    /**
     * Translation value
     * @type {FVector}
     * @public
     */
    @UProperty({name: "translation"})
    public translation: FVector

    /**
     * Scale 3D value
     * @type {FVector}
     * @public
     */
    @UProperty({name: "Scale3D"})
    public scale3D: FVector

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FQuat} rotation Rotation to use
     * @param {FVector} translation Translation to use
     * @param {FVector} scale3D Scale(3D) to use
     * @constructor
     * @public
     */
    constructor(rotation: FQuat, translation: FVector, scale3D: FVector)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any, z?: any) {
        if (!x) {
            this.rotation = new FQuat(0, 0, 0, 0)
            this.translation = new FVector()
            this.scale3D = new FVector(1)
        } else if (x instanceof FArchive) {
            this.rotation = new FQuat(x)
            this.translation = new FVector(x)
            this.scale3D = new FVector(x)
        } else {
            this.rotation = x
            this.translation = y
            this.scale3D = z
        }
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            rotation: this.rotation.toJson(),
            translation: this.translation.toJson(),
            scale3D: this.scale3D.toJson()
        }
    }
}