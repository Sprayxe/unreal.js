import { UObject } from "./UObject";
import { Pair } from "../../../util/Pair";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";

export class UEnum extends UObject {
    /** List of pairs of all enum names and values. */
    names: Pair<FName, number>[]

    /** How the enum was originally defined. */
    cppForm: ECppForm

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.names = Ar.readArray(() => {
            return {
                key: Ar.readFName() ,
                value: Number(Ar.readInt64())
            }
        })
        this.cppForm = Object.values(ECppForm)[Ar.readUInt8()]
    }
}

/** How this enum is declared in C++, affects the internal naming of enum values */
export enum ECppForm {
    Regular = "Regular",
    Namespaced = "Namespaced",
    EnumClass = "EnumClass"
}