import { UStruct } from "./UStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { EFunctionFlags } from "../enums/EFunctionFlag";

export class UFunction extends UStruct {
    functionFlags = 0
    eventGraphFunction: UFunction = null
    eventGraphCallOffset = 0

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