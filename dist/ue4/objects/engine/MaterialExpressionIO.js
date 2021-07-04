"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMaterialAttributesInput = exports.FVector2MaterialInput = exports.FVectorMaterialInput = exports.FScalarMaterialInput = exports.FColorMaterialInput = exports.FMaterialInput = exports.FExpressionInput = void 0;
const FArchive_1 = require("../../reader/FArchive");
const FColor_1 = require("../core/math/FColor");
const FVector_1 = require("../core/math/FVector");
const FVector2D_1 = require("../core/math/FVector2D");
/**
 * FExpressionInput
 * @implements {IStructType}
 */
class FExpressionInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            this.outputIndex = arg1.readInt32();
            this.inputName = arg1.readFName();
            this.mask = arg1.readInt32();
            this.maskR = arg1.readInt32();
            this.maskG = arg1.readInt32();
            this.maskB = arg1.readInt32();
            this.maskA = arg1.readInt32();
            this.expressionName = arg1.readFName();
        }
        else {
            this.outputIndex = arg1;
            this.inputName = args[1];
            this.mask = args[2];
            this.maskR = args[3];
            this.maskG = args[4];
            this.maskB = args[5];
            this.maskA = args[6];
            this.expressionName = args[7];
        }
    }
    /**
     * Serializes this
     * @param {Array<any>} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args) {
        const Ar = args[0];
        Ar.writeInt32(this.outputIndex);
        Ar.writeFName(this.inputName);
        Ar.writeInt32(this.mask);
        Ar.writeInt32(this.maskR);
        Ar.writeInt32(this.maskG);
        Ar.writeInt32(this.maskB);
        Ar.writeInt32(this.maskA);
        Ar.writeFName(this.expressionName);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            outputIndex: this.outputIndex,
            inputName: this.inputName,
            mask: this.mask,
            maskR: this.maskR,
            maskG: this.maskG,
            maskB: this.maskB,
            maskA: this.maskA,
            expressionName: this.expressionName.text
        };
    }
}
exports.FExpressionInput = FExpressionInput;
/**
 * FMaterialInput
 * @extends {FExpressionInput}
 */
class FMaterialInput extends FExpressionInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1);
            this.useConstant = arg1.readUInt32() !== 0;
            this.constant = args[1]();
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            this.useConstant = args[8];
            this.constant = args[9];
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
    serialize(Ar, write) {
        super.serialize(Ar);
        Ar.writeUInt32(this.useConstant ? 1 : 0);
        write(this.constant);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson();
        obj.useConstant = this.useConstant;
        obj.constant = this.constant;
        return obj;
    }
}
exports.FMaterialInput = FMaterialInput;
/**
 * FColorMaterialInput
 * @extends {FMaterialInput<FColor>}
 */
class FColorMaterialInput extends FMaterialInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1, () => new FColor_1.FColor(arg1));
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar, (it) => it.serialize(Ar));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson();
        obj.constant = this.constant.toJson();
        return obj;
    }
}
exports.FColorMaterialInput = FColorMaterialInput;
/**
 * FScalarMaterialInput
 * @extends {FMaterialInput<number>}
 */
class FScalarMaterialInput extends FMaterialInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1, () => arg1.readFloat32());
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar, (it) => Ar.writeFloat32(it));
    }
}
exports.FScalarMaterialInput = FScalarMaterialInput;
/**
 * FVectorMaterialInput
 * @extends {FMaterialInput<FVector>}
 */
class FVectorMaterialInput extends FMaterialInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1, () => new FVector_1.FVector(arg1));
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar, (it) => it.serialize(Ar));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson();
        obj.constant = this.constant.toJson();
        return obj;
    }
}
exports.FVectorMaterialInput = FVectorMaterialInput;
/**
 * FVector2MaterialInput
 * @extends {FMaterialInput<FVector2D>}
 */
class FVector2MaterialInput extends FMaterialInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1, () => new FVector2D_1.FVector2D(arg1));
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar, (it) => it.serialize(Ar));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson();
        obj.constant = this.constant.toJson();
        return obj;
    }
}
exports.FVector2MaterialInput = FVector2MaterialInput;
/**
 * FMaterialAttributesInput
 * @extends {FExpressionInput}
 */
class FMaterialAttributesInput extends FExpressionInput {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg1 = args[0];
        if (arg1 instanceof FArchive_1.FArchive) {
            super(arg1);
        }
        else {
            super(arg1, args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        }
    }
}
exports.FMaterialAttributesInput = FMaterialAttributesInput;
