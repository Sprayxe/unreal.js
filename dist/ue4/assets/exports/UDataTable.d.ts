import { UObject } from "./UObject";
import { UnrealMap } from "../../../util/UnrealMap";
import { FName } from "../../objects/uobject/FName";
import { UScriptStruct } from "./UScriptStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FTableRowBase } from "../../objects/FTableRowBase";
import { Locres } from "../../locres/Locres";
/**
 * Represents an UE4 Data Table
 * @extends {UObject}
 */
export declare class UDataTable extends UObject {
    /**
     * Struct of rows
     * @type {UScriptStruct}
     * @public
     */
    RowStruct: UScriptStruct;
    /**
     * Whether strip from client builds
     * @type {?boolean}
     * @public
     */
    bStripFromClientBuilds?: boolean;
    /**
     * Whether ignore extra fields
     * @type {?boolean}
     * @public
     */
    bIgnoreExtraFields?: boolean;
    /**
     * Whether ignore missing fields
     * @type {?boolean}
     * @public
     */
    bIgnoreMissingFields?: boolean;
    /**
     * Import key fields
     * @type {?string}
     * @public
     */
    ImportKeyField?: string;
    /**
     * Table rows
     * @type {UnrealMap<FName, UObject>}
     * @public
     */
    rows: UnrealMap<FName, UObject>;
    /**
     * Creates an instance using rows
     * @param {?UnrealMap<FName, UObject>} rows Rows to apply
     * @constructor
     * @public
     */
    constructor(rows?: UnrealMap<FName, UObject>);
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Finds a row
     * @param {string} rowName Name of row to find
     * @returns {?UObject} Row or null
     * @public
     */
    findRow(rowName: string | FName): UObject;
    /**
     * Finds a row mapped (maps properties to object)
     * @param {string} rowName Name of row to find
     * @returns {?any} Row or null
     * @public
     */
    findRowMapped<T extends FTableRowBase>(rowName: FName): T;
    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any;
}
