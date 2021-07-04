import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import Collection from "@discordjs/collection";
/**
 * FTextLocalizationResource
 */
export declare class FTextLocalizationResource {
    /**
     * locResMagic
     * @type {FGuid}
     * @public
     */
    locResMagic: FGuid;
    /**
     * indexNone
     * @type {number}
     * @public
     */
    indexNone: number;
    /**
     * version
     * @type {version}
     * @public
     */
    version: number;
    /**
     * strArrayOffset
     * @type {number}
     * @public
     */
    strArrayOffset: number;
    /**
     * stringData
     * @type {Collection<string, Collection<string, string>>}
     * @public
     */
    stringData: Collection<string, Collection<string, string>>;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FTextLocalizationResourceString
 */
export declare class FTextLocalizationResourceString {
    /**
     * Data
     * @type {string}
     * @public
     */
    data: string;
    /**
     * refCount
     * @type {number}
     * @public
     */
    refCount: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {string} data Data to use
     * @param {number} refCount Ref count to use
     * @constructor
     * @public
     */
    constructor(data: string, refCount: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
/**
 * FTextKey
 */
export declare class FTextKey {
    /**
     * stringHash
     * @type {number}
     * @public
     */
    stringHash: number;
    /**
     * text
     * @type {string}
     * @public
     */
    text: string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} stringHash String hash to use
     * @param {string} text Text to use
     * @constructor
     * @public
     */
    constructor(stringHash: number, text: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
