import { FName } from "../uobject/FName";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";
import { FColor } from "../core/math/FColor";
import { FVector } from "../core/math/FVector";
import { FVector2D } from "../core/math/FVector2D";
import { IStructType } from "../../assets/objects/UScriptStruct";
/**
 * FExpressionInput
 * @implements {IStructType}
 */
export declare class FExpressionInput implements IStructType {
    /**
     * Index into Expression's outputs array that this input is connected to.
     * @type {number}
     * @public
     */
    outputIndex: number;
    /**
     * inputName
     * @type {FName}
     * @public
     */
    inputName: FName;
    /**
     * mask
     * @type {number}
     * @public
     */
    mask: number;
    /**
     * maskR
     * @type {number}
     * @public
     */
    maskR: number;
    /**
     * maskG
     * @type {number}
     * @public
     */
    maskG: number;
    /**
     * maskB
     * @type {number}
     * @public
     */
    maskB: number;
    /**
     * maskA
     * @type {number}
     * @public
     */
    maskA: number;
    /**
     * Material expression name that this input is connected to, or None if not connected. Used only in cooked builds
     * @type {FName}
     * @public
     */
    expressionName: FName;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName);
    /**
     * Serializes this
     * @param {Array<any>} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args: any[]): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FMaterialInput
 * @extends {FExpressionInput}
 */
export declare class FMaterialInput<T> extends FExpressionInput {
    /**
     * useConstant
     * @type {boolean}
     * @public
     */
    useConstant: boolean;
    /**
     * constant
     * @type {any}
     * @public
     */
    constant: T;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new FMaterialInput(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @param {boolean} useConstant Whether to use constant
     * @param {any} constant Constant to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: T);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Write method to use
     * @example <FMaterialInput>.serialize(Ar, (fvector) => fvector.serialize(Ar))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (type: T) => void): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FColorMaterialInput
 * @extends {FMaterialInput<FColor>}
 */
export declare class FColorMaterialInput extends FMaterialInput<FColor> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @param {boolean} useConstant Whether to use constant
     * @param {FColor} constant Constant to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FColor);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FScalarMaterialInput
 * @extends {FMaterialInput<number>}
 */
export declare class FScalarMaterialInput extends FMaterialInput<number> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @param {boolean} useConstant Whether to use constant
     * @param {number} constant Constant to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
/**
 * FVectorMaterialInput
 * @extends {FMaterialInput<FVector>}
 */
export declare class FVectorMaterialInput extends FMaterialInput<FVector> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @param {boolean} useConstant Whether to use constant
     * @param {FVector} constant Constant to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FVector);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FVector2MaterialInput
 * @extends {FMaterialInput<FVector2D>}
 */
export declare class FVector2MaterialInput extends FMaterialInput<FVector2D> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @param {boolean} useConstant Whether to use constant
     * @param {FVector2D} constant Constant to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FVector2D);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FMaterialAttributesInput
 * @extends {FExpressionInput}
 */
export declare class FMaterialAttributesInput extends FExpressionInput {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} outputIndex Output index to use
     * @param {FName} inputName Input name to use
     * @param {number} mask Mask to use
     * @param {number} maskR R Mask to use
     * @param {number} maskG G Mask to use
     * @param {number} maskB B Mask to use
     * @param {number} maskA A Mask to use
     * @param {FName} expressionName Expression name to use
     * @constructor
     * @public
     */
    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName);
}
