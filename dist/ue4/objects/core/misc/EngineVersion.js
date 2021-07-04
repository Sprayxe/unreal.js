"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEngineVersion = void 0;
const EngineVersionBase_1 = require("./EngineVersionBase");
const FArchive_1 = require("../../../reader/FArchive");
const sprintf_js_1 = require("sprintf-js");
/**
 * FEngineVersion
 * @extends {FEngineVersionBase}
 */
class FEngineVersion extends EngineVersionBase_1.FEngineVersionBase {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (params[0] instanceof FArchive_1.FArchive) {
            const Ar = params[0];
            super(Ar.readUInt16(), Ar.readUInt16(), Ar.readUInt16(), Ar.readUInt32());
            this.branch = Ar.readString();
        }
        else {
            super(params[0], params[1], params[2], params[3]);
            this.branch = params[4];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt16(this.major);
        Ar.writeUInt16(this.minor);
        Ar.writeUInt16(this.patch);
        Ar.writeUInt32(this.changelist);
        Ar.writeString(this.branch);
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    toString(x) {
        if (x == null) {
            return this.toString(EngineVersionBase_1.EVersionComponent.Branch);
        }
        else {
            let result = sprintf_js_1.sprintf("%d", this.major);
            if (x >= EngineVersionBase_1.EVersionComponent.Minor) {
                result += sprintf_js_1.sprintf(".%d", this.minor);
                if (x >= EngineVersionBase_1.EVersionComponent.Patch) {
                    result += sprintf_js_1.sprintf(".%d", this.patch);
                    if (x >= EngineVersionBase_1.EVersionComponent.ChangeList) {
                        result += sprintf_js_1.sprintf("-%d", this.changelist);
                        if (x >= EngineVersionBase_1.EVersionComponent.Branch && this.branch) {
                            result += sprintf_js_1.sprintf("+%s", this.branch !== "");
                        }
                    }
                }
            }
            return result;
        }
    }
}
exports.FEngineVersion = FEngineVersion;
