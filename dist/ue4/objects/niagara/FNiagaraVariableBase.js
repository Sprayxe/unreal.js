"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNiagaraVariableBase = void 0;
const FName_1 = require("../uobject/FName");
const FStructFallback_1 = require("../../assets/objects/FStructFallback");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
/**
 * FNiagaraVariableBase
 * @implements {IStructType}
 */
class FNiagaraVariableBase {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.name = x.readFName();
            this.typeDef = new FStructFallback_1.FStructFallback(x, FName_1.FName.dummy("NiagaraTypeDefinition"));
        }
        else {
            this.name = x;
            this.typeDef = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFName(this.name);
        this.typeDef.serialize(Ar);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            name: this.name.text,
            typeDef: this.typeDef.toJson()
        };
    }
}
exports.FNiagaraVariableBase = FNiagaraVariableBase;
