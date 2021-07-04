import { ETextHistoryType } from "../../../assets/enums/ETextHistoryType";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FArchive } from "../../../reader/FArchive";
import { FDateTime } from "../misc/DateTime";
import { EDateTimeStyle } from "../../../assets/enums/EDateTimeStyle";
import { FName } from "../../uobject/FName";
import { Locres } from "../../../locres/Locres";
/**
 * EFormatArgumentType
 * @enum
 */
export declare enum EFormatArgumentType {
    Int = 0,
    UInt = 1,
    Float = 2,
    Double = 3,
    Text = 4,
    Gender = 5
}
/**
 * FText
 */
export declare class FText {
    /**
     * flags
     * @type {number}
     * @public
     */
    flags: number;
    /**
     * historyType
     * @type {ETextHistoryType}
     * @public
     */
    historyType: ETextHistoryType;
    /**
     * textHistory
     * @type {FTextHistory}
     * @public
     */
    textHistory: FTextHistory;
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
     * Creates an instance using source string
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(sourceString: string);
    /**
     * Creates an instance using namespace, key, sourceString
     * @param {string} namespace Namespace to use
     * @param {string} key Key to use
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(namespace: string, key: string, sourceString: string);
    /**
     * Creates an instance using values
     * @param {string} namespace Namespace to use
     * @param {string} key Key to use
     * @param {string} sourceString Source string to use
     * @param {number} flags Flags to use
     * @param {ETextHistoryType} historyType History type to use
     * @constructor
     * @public
     */
    constructor(namespace: string, key: string, sourceString: string, flags: number, historyType: ETextHistoryType);
    /**
     * Creates an instance using flags, historyType, textHistory
     * @param {number} flags Flags to use
     * @param {ETextHistoryType | number} historyType History type to use
     * @param {FTextHistory} textHistory Text history to use
     * @constructor
     * @public
     */
    constructor(flags: number, historyType: number, textHistory: FTextHistory);
    /**
     * Copies values
     * @returns {FText} Copied instance
     * @public
     */
    copy(): FText;
    /**
     * Gets text for provided locres
     * @param {?Locres} locres Locres to use
     * @returns {string} Text
     * @public
     */
    textForLocres(locres?: Locres): string;
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): {
        historyType: string;
        finalText: string;
        value: any;
    };
}
/**
 * FTextHistory
 * @abstract
 */
export declare abstract class FTextHistory {
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     * @abstract
     */
    abstract serialize(Ar: FArchiveWriter): any;
    /**
     * Text
     * @type {string}
     * @public
     * @abstract
     */
    abstract text: string;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     * @abstract
     */
    abstract toJson(): any;
    /**
     * @class OrderedFormat
     * @public
     */
    OrderedFormat: {
        new (): {
            sourceFmt: FText;
            arguments: any;
        };
    };
}
/**
 * FTextHistoryNone
 * @extends {FTextHistory}
 */
export declare class FTextHistoryNone extends FTextHistory {
    /**
     * cultureInvariantString
     * @type {string}
     * @public
     */
    cultureInvariantString: string;
    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): {
        cultureInvariantString: string;
    };
}
/**
 * FTextHistoryBase
 * @extends {FTextHistory}
 */
export declare class FTextHistoryBase extends FTextHistory {
    namespace: string;
    key: string;
    sourceString: string;
    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using namespace, key, sourceString
     * @param {string} namespace Namespace to use
     * @param {string} key Key to use
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(namespace: string, key: string, sourceString: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FTextHistoryDateTime
 * @extends {FTextHistory}
 */
export declare class FTextHistoryDateTime extends FTextHistory {
    /**
     * sourceDateTime
     * @type {FDateTime}
     * @public
     */
    sourceDateTime: FDateTime;
    /**
     * dateStyle
     * @type {EDateTimeStyle}
     * @public
     */
    dateStyle: EDateTimeStyle;
    /**
     * timeStyle
     * @type {EDateTimeStyle}
     * @public
     */
    timeStyle: EDateTimeStyle;
    /**
     * timeZone
     * @type {string}
     * @public
     */
    timeZone: string;
    /**
     * targetCulture
     * @type {string}
     * @public
     */
    targetCulture: string;
    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FDateTime} sourceDateTime Source date time to use
     * @param {EDateTimeStyle} dateStyle Date style to use
     * @param {EDateTimeStyle} timeStyle Time style to use
     * @param {string} timeZone Time zone to use
     * @param {string} targetCulture Targeted culture
     * @constructor
     * @public
     */
    constructor(sourceDateTime: FDateTime, dateStyle: EDateTimeStyle, timeStyle: EDateTimeStyle, timeZone: string, targetCulture: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FTextHistoryOrderedFormat
 * @extends {FTextHistory}
 */
export declare class FTextHistoryOrderedFormat extends FTextHistory {
    /**
     * sourceFmt
     * @type {FText}
     * @public
     */
    sourceFmt: FText;
    /**
     * args
     * @type {Array<FFormatArgumentValue>}
     * @public
     */
    args: FFormatArgumentValue[];
    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FText} sourceFmt Source fmt to use
     * @param {Array<FFormatArgumentValue>} args Args to use
     * @constructor
     * @public
     */
    constructor(sourceFmt: FText, args: FFormatArgumentValue[]);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any;
}
/**
 * FTextHistoryFormatNumber
 * @extends {FTextHistory}
 */
export declare class FTextHistoryFormatNumber extends FTextHistory {
    /**
     * The source value to format from
     * @type {FFormatArgumentValue}
     * @public
     */
    sourceValue: FFormatArgumentValue;
    /**
     * The time zone to format using
     * @type {string}
     * @public
     */
    timeZone: string;
    /**
     * The culture to format using
     * @type {string}
     * @public
     */
    targetCulture: string;
    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FFormatArgumentValue} sourceValue Source value to use
     * @param {string} timeZone Time zone to use
     * @param {string} targetCulture Targeted culture
     * @constructor
     * @public
     */
    constructor(sourceValue: FFormatArgumentValue, timeZone: string, targetCulture: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FTextHistoryStringTableEntry
 * @extends {FTextHistory}
 */
export declare class FTextHistoryStringTableEntry extends FTextHistory {
    /**
     * Table ID
     * @type {FName}
     * @public
     */
    tableId: FName;
    /**
     * Key
     * @type {string}
     * @public
     */
    key: string;
    /**
     * Text
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
     * @param {FName} tableId Table ID to use
     * @param {string} key Key to use
     * @param {string} text Text to use
     * @constructor
     * @public
     */
    constructor(tableId: FName, key: string, text: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
export declare class FFormatArgumentValue {
    /**
     * Type
     * @type {EFormatArgumentType}
     * @public
     */
    type: EFormatArgumentType;
    /**
     * Value
     * @type {any}
     * @public
     */
    value: any;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {EFormatArgumentType} type Type to use
     * @param {any} value Value to use
     * @constructor
     * @public
     */
    constructor(type: EFormatArgumentType, value: any);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string} String
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): {
        value: any;
        type: string;
    };
}
