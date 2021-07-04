"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNiagaraVariableWithOffset = void 0;
const FNiagaraVariableBase_1 = require("./FNiagaraVariableBase");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
/**
 * FNiagaraVariableWithOffset
 * @extends {FNiagaraVariableBase}
 */
class FNiagaraVariableWithOffset extends FNiagaraVariableBase_1.FNiagaraVariableBase {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            super(x);
            this.offset = x.readInt32();
        }
        else {
            super(x, y);
            this.offset = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar);
        Ar.write(this.offset);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson();
        obj.offset = this.offset;
        return obj;
    }
}
exports.FNiagaraVariableWithOffset = FNiagaraVariableWithOffset;
