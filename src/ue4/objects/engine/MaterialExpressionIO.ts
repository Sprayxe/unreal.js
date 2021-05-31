import { FName } from "../uobject/FName";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";
import { FColor } from "../core/math/FColor";
import { FVector } from "../core/math/FVector";
import { FVector2D } from "../core/math/FVector2D";
import { IStructType } from "../../assets/objects/UScriptStruct";

export class FExpressionInput implements IStructType {
    /** Index into Expression's outputs array that this input is connected to. */
    public outputIndex: number
    public inputName: FName
    public mask: number
    public maskR: number
    public maskG: number
    public maskB: number
    public maskA: number
    /** Material expression name that this input is connected to, or None if not connected. Used only in cooked builds */
    public expressionName: FName

    constructor(Ar: FArchive)
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

export class FMaterialInput<T> extends FExpressionInput implements IStructType {
    public useConstant: boolean
    public constant: T

    constructor(Ar: FArchive, init: () => T)
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

    serialize(Ar: FArchiveWriter, write: (type: T) => void) {
        super.serialize(Ar)
        Ar.writeUInt32(this.useConstant ? 1 : 0)
        write(this.constant)
    }

    toJson(): any {
        const obj = super.toJson()
        obj.useConstant = this.useConstant
        obj.constant = this.constant
        return obj
    }
}

export class FColorMaterialInput extends FMaterialInput<FColor> {
    constructor(Ar: FArchive)
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
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FColor(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

export class FScalarMaterialInput extends FMaterialInput<number> {
    constructor(Ar: FArchive)
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
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => arg1.readFloat32())
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => Ar.writeFloat32(it))
    }
}

export class FVectorMaterialInput extends FMaterialInput<FVector> {
    constructor(Ar: FArchive)
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
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FVector(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

export class FVector2MaterialInput extends FMaterialInput<FVector2D> {
    constructor(Ar: FArchive)
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
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1, () => new FVector2D(arg1))
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
        }
    }

    serialize(Ar: FArchiveWriter) {
        super.serialize(Ar, (it) => it.serialize(Ar))
    }

    toJson(): any {
        const obj = super.toJson()
        obj.constant = this.constant.toJson()
        return obj
    }
}

export class FMaterialAttributesInput extends FExpressionInput {
    constructor(Ar: FArchive)
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
    constructor(...args) {
        const arg1 = args[0]
        if (arg1 instanceof FArchive) {
            super(arg1)
        } else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7])
        }
    }
}