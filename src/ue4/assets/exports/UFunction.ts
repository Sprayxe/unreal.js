import { UStruct } from "./UStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { EFunctionFlags } from "../enums/EFunctionFlag";

/**
 * UFunction
 * @extends {UStruct}
 */
export class UFunction extends UStruct {
    /**
     * Function flags
     * @type {number}
     * @public
     */
    functionFlags = 0

    /**
     * Event graph function
     * @type {UFunction}
     * @public
     */
    eventGraphFunction: UFunction = null

    /**
     * Event graph call offset
     * @type {number}
     * @public
     */
    eventGraphCallOffset = 0

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.functionFlags = Ar.readUInt32()

        // Replication info
        if ((this.functionFlags & EFunctionFlags.FUNC_Net) !== 0) {
            // Unused.
            const repOffset = Ar.readInt16()
        }

        if (Ar.ver >= 451 /*VER_UE4_SERIALIZE_BLUEPRINT_EVENTGRAPH_FASTCALLS_IN_UFUNCTION*/) {
            this.eventGraphFunction = Ar.readObject()
            this.eventGraphCallOffset = Ar.readInt32()
        }
    }
}