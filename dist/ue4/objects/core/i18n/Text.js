"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFormatArgumentValue = exports.FTextHistoryStringTableEntry = exports.FTextHistoryFormatNumber = exports.FTextHistoryOrderedFormat = exports.FTextHistoryDateTime = exports.FTextHistoryBase = exports.FTextHistoryNone = exports.FTextHistory = exports.FText = exports.EFormatArgumentType = void 0;
const ETextHistoryType_1 = require("../../../assets/enums/ETextHistoryType");
const FArchive_1 = require("../../../reader/FArchive");
const DateTime_1 = require("../misc/DateTime");
const EDateTimeStyle_1 = require("../../../assets/enums/EDateTimeStyle");
const FAssetArchive_1 = require("../../../assets/reader/FAssetArchive");
const Exceptions_1 = require("../../../../exceptions/Exceptions");
const FAssetArchiveWriter_1 = require("../../../assets/writer/FAssetArchiveWriter");
/**
 * EFormatArgumentType
 * @enum
 */
var EFormatArgumentType;
(function (EFormatArgumentType) {
    EFormatArgumentType[EFormatArgumentType["Int"] = 0] = "Int";
    EFormatArgumentType[EFormatArgumentType["UInt"] = 1] = "UInt";
    EFormatArgumentType[EFormatArgumentType["Float"] = 2] = "Float";
    EFormatArgumentType[EFormatArgumentType["Double"] = 3] = "Double";
    EFormatArgumentType[EFormatArgumentType["Text"] = 4] = "Text";
    EFormatArgumentType[EFormatArgumentType["Gender"] = 5] = "Gender";
})(EFormatArgumentType = exports.EFormatArgumentType || (exports.EFormatArgumentType = {}));
/**
 * FText
 */
class FText {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        const x = params[0];
        if (x instanceof FArchive_1.FArchive) {
            this.flags = x.readUInt32();
            this.historyType = x.readInt8();
            this.textHistory = this.historyType === ETextHistoryType_1.ETextHistoryType.None ? new FTextHistoryNone(x) :
                this.historyType === ETextHistoryType_1.ETextHistoryType.Base ? new FTextHistoryBase(x) :
                    this.historyType === ETextHistoryType_1.ETextHistoryType.OrderedFormat ? new FTextHistoryOrderedFormat(x) :
                        this.historyType === ETextHistoryType_1.ETextHistoryType.AsCurrency ? new FTextHistoryFormatNumber(x) :
                            this.historyType === ETextHistoryType_1.ETextHistoryType.StringTableEntry ? new FTextHistoryStringTableEntry(x) :
                                null;
            this.text = this.textHistory.text;
        }
        else if (typeof x === "string" && params.length === 1) {
            this.flags = 0;
            this.historyType = ETextHistoryType_1.ETextHistoryType.Base;
            this.textHistory = new FTextHistoryBase("", "", x);
            this.text = this.textHistory.text;
        }
        else if (typeof x === "string" && params.length === 3) {
            this.flags = 0;
            this.historyType = ETextHistoryType_1.ETextHistoryType.Base;
            this.textHistory = new FTextHistoryBase(x, params[1], params[2]);
            this.text = this.textHistory.text;
        }
        else if (typeof x === "number") {
            this.flags = x;
            this.historyType = params[1];
            this.textHistory = params[2];
            this.text = this.textHistory.text;
        }
        else {
            this.flags = params[3];
            this.historyType = params[4];
            this.textHistory = new FTextHistoryBase(x, params[1], params[2]);
            this.text = this.textHistory.text;
        }
    }
    /**
     * Copies values
     * @returns {FText} Copied instance
     * @public
     */
    copy() {
        return new FText(this.flags, this.historyType, this.textHistory);
    }
    /**
     * Gets text for provided locres
     * @param {?Locres} locres Locres to use
     * @returns {string} Text
     * @public
     */
    textForLocres(locres) {
        const history = this.textHistory;
        return history instanceof FTextHistoryBase
            ? locres?.texts?.stringData?.get(history.namespace)?.get(history.key) || this.text
            : this.text;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.flags);
        Ar.writeInt8(this.historyType);
        this.textHistory.serialize(Ar);
    }
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return this.text;
    }
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres) {
        const enums = Object.keys(ETextHistoryType_1.ETextHistoryType)
            .splice(13)
            .filter(e => e !== "-1"); // Lol this is so dumb
        return {
            historyType: enums[this.historyType + 1],
            finalText: this.textForLocres(locres),
            value: this.textHistory.toJson()
        };
    }
}
exports.FText = FText;
/**
 * FTextHistory
 * @abstract
 */
class FTextHistory {
    constructor() {
        /**
         * @class OrderedFormat
         * @public
         */
        this.OrderedFormat = class {
        };
    }
}
exports.FTextHistory = FTextHistory;
/**
 * FTextHistoryNone
 * @extends {FTextHistory}
 */
class FTextHistoryNone extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        super();
        /**
         * cultureInvariantString
         * @type {string}
         * @public
         */
        this.cultureInvariantString = null;
        if (x) {
            const bHasCultureInvariantString = x.readBoolean();
            if (bHasCultureInvariantString) {
                this.cultureInvariantString = x.readString();
            }
        }
    }
    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.cultureInvariantString || "";
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        const bHasCultureInvariantString = !!this.cultureInvariantString;
        Ar.writeBoolean(bHasCultureInvariantString);
        if (bHasCultureInvariantString) {
            Ar.writeString(this.cultureInvariantString);
        }
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return { cultureInvariantString: this.cultureInvariantString };
    }
}
exports.FTextHistoryNone = FTextHistoryNone;
/**
 * FTextHistoryBase
 * @extends {FTextHistory}
 */
class FTextHistoryBase extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super();
        const x = params[0];
        if (x instanceof FArchive_1.FArchive) {
            this.namespace = x.readString();
            this.key = x.readString();
            this.sourceString = x.readString();
        }
        else {
            this.namespace = x;
            this.key = params[1];
            this.sourceString = params[2];
        }
    }
    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.sourceString;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeString(this.namespace);
        Ar.writeString(this.key);
        Ar.writeString(this.sourceString);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            namespace: this.namespace,
            key: this.key,
            sourceString: this.sourceString
        };
    }
}
exports.FTextHistoryBase = FTextHistoryBase;
/**
 * FTextHistoryDateTime
 * @extends {FTextHistory}
 */
class FTextHistoryDateTime extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super();
        const x = params[0];
        if (x instanceof FArchive_1.FArchive) {
            this.sourceDateTime = new DateTime_1.FDateTime(x);
            this.dateStyle = x.readInt8();
            this.timeStyle = x.readInt8();
            this.timeZone = x.readString();
            this.targetCulture = x.readString();
        }
        else {
            this.sourceDateTime = x;
            this.dateStyle = params[1];
            this.timeStyle = params[2];
            this.timeZone = params[3];
            this.targetCulture = params[4];
        }
    }
    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return `${this.timeZone}: ${this.sourceDateTime.date}`;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.sourceDateTime.serialize(Ar);
        Ar.writeInt8(this.dateStyle);
        Ar.writeInt8(this.timeStyle);
        Ar.writeString(this.timeZone);
        Ar.writeString(this.targetCulture);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = Object.keys(EDateTimeStyle_1.EDateTimeStyle);
        return {
            sourceDateTime: this.sourceDateTime.toJson(),
            dateStyle: obj[this.dateStyle],
            timeStyle: obj[this.timeStyle],
            timeZone: this.timeZone,
            targetCulture: this.targetCulture
        };
    }
}
exports.FTextHistoryDateTime = FTextHistoryDateTime;
/**
 * FTextHistoryOrderedFormat
 * @extends {FTextHistory}
 */
class FTextHistoryOrderedFormat extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        super();
        if (x instanceof FArchive_1.FArchive) {
            this.sourceFmt = new FText(x);
            this.args = x.readArray(() => new FFormatArgumentValue(x));
        }
        else {
            this.sourceFmt = x;
            this.args = y;
        }
    }
    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.sourceFmt.text;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.sourceFmt.serialize(Ar);
        Ar.writeTArray(this.args, (it) => it.serialize(Ar));
    }
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres) {
        return {
            sourceFmt: this.sourceFmt.toJson(locres),
            args: this.args.map(a => a.toJson(locres))
        };
    }
}
exports.FTextHistoryOrderedFormat = FTextHistoryOrderedFormat;
/**
 * FTextHistoryFormatNumber
 * @extends {FTextHistory}
 */
class FTextHistoryFormatNumber extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        super();
        if (x instanceof FArchive_1.FArchive) {
            this.sourceValue = new FFormatArgumentValue(x);
            this.timeZone = x.readString();
            this.targetCulture = x.readString();
        }
        else {
            this.sourceValue = x;
            this.timeZone = y;
            this.targetCulture = z;
        }
    }
    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.sourceValue.toString();
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.sourceValue.serialize(Ar);
        Ar.writeString(this.timeZone);
        Ar.writeString(this.targetCulture);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            sourceValue: this.sourceValue.toJson(),
            timeZone: this.timeZone,
            targetCulture: this.targetCulture
        };
    }
}
exports.FTextHistoryFormatNumber = FTextHistoryFormatNumber;
/**
 * FTextHistoryStringTableEntry
 * @extends {FTextHistory}
 */
class FTextHistoryStringTableEntry extends FTextHistory {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        super();
        if (x instanceof FArchive_1.FArchive) {
            if (x instanceof FAssetArchive_1.FAssetArchive) {
                this.tableId = x.readFName();
                this.key = x.readString();
                const table = x.provider?.loadObject(this.tableId.text);
                if (!table)
                    throw new Exceptions_1.ParserException(`Failed to load string table '${this.tableId}'`, x);
                this.text = table.entries.get(this.key);
                if (!this.text)
                    throw new Exceptions_1.ParserException("Didn't find needed in key in string table", x);
            }
            else {
                throw new Exceptions_1.ParserException("Tried to load a string table entry with wrong archive type", x);
            }
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        if (Ar instanceof FAssetArchiveWriter_1.FAssetArchiveWriter) {
            Ar.writeFName(this.tableId);
            Ar.writeString(this.key);
        }
        else {
            throw new Exceptions_1.ParserException("Tried to save a string table entry with wrong archive type", Ar);
        }
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            tableId: this.tableId.text,
            key: this.key,
            text: this.text
        };
    }
}
exports.FTextHistoryStringTableEntry = FTextHistoryStringTableEntry;
class FFormatArgumentValue {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.type = EDateTimeStyle_1.EDateTimeStyle[Object.keys(EDateTimeStyle_1.EDateTimeStyle)[x.readInt8()]];
            this.value = this.type === EFormatArgumentType.Int ? Number(x.readInt64()) :
                this.type === EFormatArgumentType.UInt ? Number(x.readInt64()) :
                    this.type === EFormatArgumentType.Float ? x.readFloat32() :
                        this.type === EFormatArgumentType.Double ? x.readDouble() :
                            this.type === EFormatArgumentType.Text ? new FText(x) :
                                null; // this.type === EFormatArgumentType.Gender
        }
        else {
            this.type = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt8(this.type);
        switch (this.type) {
            case EFormatArgumentType.Int:
                Ar.writeInt64(this.value);
                break;
            case EFormatArgumentType.UInt:
                Ar.writeUInt64(this.value);
                break;
            case EFormatArgumentType.Float:
                Ar.writeFloat32(this.value);
                break;
            case EFormatArgumentType.Double:
                Ar.writeDouble(this.value);
                break;
            case EFormatArgumentType.Text:
                this.value.serialize(Ar);
                break;
            case EFormatArgumentType.Gender:
                throw new Error("Gender Argument not supported yet");
        }
    }
    /**
     * Turns this into string
     * @returns {string} String
     * @public
     */
    toString() {
        return `[Object FFormatArgumentValue]`;
    }
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres) {
        return {
            value: this.value.toJson
                ? this.value.toJson(locres)
                : this.value,
            type: Object.keys(EFormatArgumentType).filter(k => k.length > 1)[this.type]
        };
    }
}
exports.FFormatArgumentValue = FFormatArgumentValue;
