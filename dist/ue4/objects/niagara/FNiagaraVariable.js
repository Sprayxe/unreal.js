"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNiagaraVariable = void 0;
const FNiagaraVariableBase_1 = require("./FNiagaraVariableBase");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
/**
 * FNiagaraVariable
 * @extends {FNiagaraVariableBase}
 */
class FNiagaraVariable extends FNiagaraVariableBase_1.FNiagaraVariableBase {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            super(x);
            this.varData = x.readBuffer(x.readInt32());
        }
        else {
            super(x, y);
            this.varData = z;
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar);
        Ar.write(this.varData.length);
        Ar.write(this.varData);
    }
}
exports.FNiagaraVariable = FNiagaraVariable;
