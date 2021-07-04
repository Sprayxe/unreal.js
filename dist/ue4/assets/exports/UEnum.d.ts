import { UObject } from "./UObject";
import { Pair } from "../../../util/Pair";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
/**
 * How this enum is declared in C++, affects the internal naming of enum values
 * @enum
 */
export declare enum ECppForm {
    Regular = "Regular",
    Namespaced = "Namespaced",
    EnumClass = "EnumClass"
}
/**
 * UEnum
 * @extends {UObject}
 */
export declare class UEnum extends UObject {
    /**
     * List of pairs of all enum names and values
     * @type {Array<Pair<FName, number>>}
     * @public
     */
    names: Pair<FName, number>[];
    /**
     * How the enum was originally defined
     * @type {ECppForm}
     * @public
     */
    cppForm: ECppForm;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
