"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UFunction = void 0;
const UStruct_1 = require("./UStruct");
const EFunctionFlag_1 = require("../enums/EFunctionFlag");
/**
 * UFunction
 * @extends {UStruct}
 */
class UFunction extends UStruct_1.UStruct {
    constructor() {
        super(...arguments);
        /**
         * Function flags
         * @type {number}
         * @public
         */
        this.functionFlags = 0;
        /**
         * Event graph function
         * @type {UFunction}
         * @public
         */
        this.eventGraphFunction = null;
        /**
         * Event graph call offset
         * @type {number}
         * @public
         */
        this.eventGraphCallOffset = 0;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.functionFlags = Ar.readUInt32();
        // Replication info
        if ((this.functionFlags & EFunctionFlag_1.EFunctionFlags.FUNC_Net) !== 0) {
            // Unused.
            const repOffset = Ar.readInt16();
        }
        if (Ar.ver >= 451 /*VER_UE4_SERIALIZE_BLUEPRINT_EVENTGRAPH_FASTCALLS_IN_UFUNCTION*/) {
            this.eventGraphFunction = Ar.readObject();
            this.eventGraphCallOffset = Ar.readInt32();
        }
    }
}
exports.UFunction = UFunction;
