import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { UnrealMap } from "../../../util/UnrealMap";
import { Locres } from "../../locres/Locres";
/**
 * Represents UE4 String Table
 * @extends {UObject}
 */
export declare class UStringTable extends UObject {
    /**
     * Namespace of table
     * @type {string}
     * @public
     */
    tableNamespace: string;
    /**
     * Table entries
     * @type {UnrealMap<string, string>}
     * @public
     */
    entries: UnrealMap<string, string>;
    /**
     * Keys to meta data
     * @type {UnrealMap<string, UnrealMap<FName, string>>}
     * @public
     */
    keysToMetadata: UnrealMap<string, UnrealMap<FName, string>>;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Serialize this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any;
}
