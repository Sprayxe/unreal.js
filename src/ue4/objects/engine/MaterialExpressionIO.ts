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
export class FExpressionInput implements IStructType {
    /**
     * Index into Expression's outputs array that this input is connected to.
     * @type {number}
     * @public
     */
    public outputIndex: number

    /**
     * inputName
     * @type {FName}
     * @public
     */
    public inputName: FName

    /**
     * mask
     * @type {number}
     * @public
     */
    public mask: number

    /**
     * maskR
     * @type {number}
     * @public
     */
    public maskR: number

    /**
     * maskG
     * @type {number}
     * @public
     */
    public maskG: number

    /**
     * maskB
     * @type {number}
     * @public
     */
    public maskB: number

    /**
     * maskA
     * @type {number}
     * @public
     */
    public maskA: number

    /**
     * Material expression name that this input is connected to, or None if not connected. Used only in cooked builds
     * @type {FName}
     * @public
     */
    public expressionName: FName

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            this.outputIndex = arg1.readInt32()
            this.inputName = arg1.readFName()
            this.mask = arg1.readInt32()
            this.maskR = arg1.readInt32()
            this.maskG = arg1.readInt32()
            this.maskB = arg1.readInt32()
            this.maskA = arg1.readInt32()
            this.expressionName = arg1.readFName()
        } else {
            this.outputIndex = arg1
            this.inputName = args[1]
            this.mask = args[2]
            this.maskR = args[3]
            this.maskG = args[4]
            this.maskB = args[5]
            this.maskA = args[6]
            this.expressionName = args[7]
        }
    }

    /**
     * Serializes this
     * @param {Array<any>} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args) {
        const Ar = args[0] as FArchiveWriter
        Ar.writeInt32(this.outputIndex)
        Ar.writeFName(this.inputName)
        Ar.writeInt32(this.mask)
        Ar.writeInt32(this.maskR)
        Ar.writeInt32(this.maskG)
        Ar.writeInt32(this.maskB)
        Ar.writeInt32(this.maskA)
        Ar.writeFName(this.expressionName)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            outputIndex: this.outputIndex,
            inputName: this.inputName,
            mask: this.mask,
            maskR: this.maskR,
            maskG: this.maskG,
            maskB: this.maskB,
            maskA: this.maskA,
            expressionName: this.expressionName.text
        }
    }
}

/**
 * FMaterialInput
 * @extends {FExpressionInput}
 */
export class FMaterialInput<T> extends FExpressionInput {
    /**
     * useConstant
     * @type {boolean}
     * @public
     */
    public useConstant: boolean

    /**
     * constant
     * @type {any}
     * @public
     */
    public constant: T

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new FMaterialInput(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName,
        useConstant: boolean,
        constant: T
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1)
            this.useConstant = arg1.readUInt32() !== 0
            this.constant = args[1]()
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7])
            this.useConstant = args[8]
            this.constant = args[9]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Write method to use
     * @example <FMaterialInput>.serialize(Ar, (fvector) => fvector.serialize(Ar))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (type: T) => void) {
        super.serialize(Ar)
        Ar.writeUInt32(this.useConstant ? 1 : 0)
        write(this.constant)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = super.toJson()
        obj.useConstant = this.useConstant
        obj.constant = this.constant
        return obj
    }
}

/**
 * FColorMaterialInput
 * @extends {FMaterialInput<FColor>}
 */
export class FColorMaterialInput extends FMaterialInput<FColor> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName,
        useConstant: boolean,
        constant: FColor
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FColor(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

/**
 * FScalarMaterialInput
 * @extends {FMaterialInput<number>}
 */
export class FScalarMaterialInput extends FMaterialInput<number> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName,
        useConstant: boolean,
        constant: number
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => arg1.readFloat32())
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => Ar.writeFloat32(it))
    }
}

/**
 * FVectorMaterialInput
 * @extends {FMaterialInput<FVector>}
 */
export class FVectorMaterialInput extends FMaterialInput<FVector> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName,
        useConstant: boolean,
        constant: FVector
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FVector(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

/**
 * FVector2MaterialInput
 * @extends {FMaterialInput<FVector2D>}
 */
export class FVector2MaterialInput extends FMaterialInput<FVector2D> {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName,
        useConstant: boolean,
        constant: FVector2D
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FVector2D(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

/**
 * FMaterialAttributesInput
 * @extends {FExpressionInput}
 */
export class FMaterialAttributesInput extends FExpressionInput {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        outputIndex: number,
        inputName: FName,
        mask: number,
        maskR: number,
        maskG: number,
        maskB: number,
        maskA: number,
        expressionName: FName
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1)
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7])
        }
    }
}