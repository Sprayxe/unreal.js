import { ETextHistoryType } from "../../../assets/enums/ETextHistoryType";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FArchive } from "../../../reader/FArchive";
import { FDateTime } from "../misc/DateTime";
import { EDateTimeStyle } from "../../../assets/enums/EDateTimeStyle";
import { FName } from "../../uobject/FName";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { ParserException } from "../../../../exceptions/Exceptions";
import { UStringTable } from "../../../assets/exports/UStringTable";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";
import { Locres } from "../../../locres/Locres";

/**
 * EFormatArgumentType
 * @enum
 */
export enum EFormatArgumentType {
    Int,
    UInt,
    Float,
    Double,
    Text,
    Gender
}

/**
 * FText
 */
export class FText {
    /**
     * flags
     * @type {number}
     * @public
     */
    flags: number

    /**
     * historyType
     * @type {ETextHistoryType}
     * @public
     */
    historyType: ETextHistoryType

    /**
     * textHistory
     * @type {FTextHistory}
     * @public
     */
    textHistory: FTextHistory

    /**
     * text
     * @type {string}
     * @public
     */
    text: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using source string
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(sourceString: string)

    /**
     * Creates an instance using namespace, key, sourceString
     * @param {string} namespace Namespace to use
     * @param {string} key Key to use
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(namespace: string, key: string, sourceString: string)

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
    constructor(namespace: string, key: string, sourceString: string, flags: number, historyType: ETextHistoryType)

    /**
     * Creates an instance using flags, historyType, textHistory
     * @param {number} flags Flags to use
     * @param {ETextHistoryType | number} historyType History type to use
     * @param {FTextHistory} textHistory Text history to use
     * @constructor
     * @public
     */
    constructor(flags: number, historyType: number, textHistory: FTextHistory)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        const x = params[0]
        if (x instanceof FArchive) {
            this.flags = x.readUInt32()
            this.historyType = x.readInt8()
            this.textHistory = this.historyType === ETextHistoryType.None ? new FTextHistoryNone(x) :
                this.historyType === ETextHistoryType.Base ? new FTextHistoryBase(x) :
                this.historyType === ETextHistoryType.OrderedFormat ? new FTextHistoryOrderedFormat(x) :
                this.historyType === ETextHistoryType.AsCurrency ? new FTextHistoryFormatNumber(x) :
                this.historyType === ETextHistoryType.StringTableEntry ? new FTextHistoryStringTableEntry(x) :
                null
            this.text = this.textHistory.text
        } else if (typeof x === "string" && params.length === 1) {
            this.flags = 0
            this.historyType = ETextHistoryType.Base
            this.textHistory = new FTextHistoryBase("", "", x)
            this.text = this.textHistory.text
        } else if (typeof x === "string" && params.length === 3) {
            this.flags = 0
            this.historyType = ETextHistoryType.Base
            this.textHistory = new FTextHistoryBase(x, params[1], params[2])
            this.text = this.textHistory.text
        } else if (typeof x === "number") {
            this.flags = x
            this.historyType = params[1]
            this.textHistory = params[2]
            this.text = this.textHistory.text
        } else {
            this.flags = params[3]
            this.historyType = params[4]
            this.textHistory = new FTextHistoryBase(x, params[1], params[2])
            this.text = this.textHistory.text
        }
    }

    /**
     * Copies values
     * @returns {FText} Copied instance
     * @public
     */
    copy() {
        return new FText(this.flags, this.historyType, this.textHistory)
    }

    /**
     * Gets text for provided locres
     * @param {?Locres} locres Locres to use
     * @returns {string} Text
     * @public
     */
    textForLocres(locres?: Locres): string {
        const history = this.textHistory
        return history instanceof FTextHistoryBase
            ? locres?.texts?.stringData?.get(history.namespace)?.get(history.key) || this.text
            : this.text
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.flags)
        Ar.writeInt8(this.historyType)
        this.textHistory.serialize(Ar)
    }

    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return this.text
    }

    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres) {
        const enums = Object.keys(ETextHistoryType)
            .splice(13)
            .filter(e => e !== "-1") // Lol this is so dumb
        return {
            historyType: enums[this.historyType + 1],
            finalText: this.textForLocres(locres),
            value: this.textHistory.toJson()
        }
    }
}

/**
 * FTextHistory
 * @abstract
 */
export abstract class FTextHistory {
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     * @abstract
     */
    abstract serialize(Ar: FArchiveWriter)

    /**
     * Text
     * @type {string}
     * @public
     * @abstract
     */
    abstract text: string

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     * @abstract
     */
    abstract toJson(): any

    /**
     * @class OrderedFormat
     * @public
     */
    OrderedFormat = class {
        sourceFmt: FText
        arguments
    }
}

/**
 * FTextHistoryNone
 * @extends {FTextHistory}
 */
export class FTextHistoryNone extends FTextHistory {
    /**
     * cultureInvariantString
     * @type {string}
     * @public
     */
    cultureInvariantString: string = null

    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string {
        return this.cultureInvariantString || ""
    }

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any) {
        super()
        if (x) {
            const bHasCultureInvariantString = x.readBoolean()
            if (bHasCultureInvariantString) {
                this.cultureInvariantString = x.readString()
            }
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        const bHasCultureInvariantString = !!this.cultureInvariantString
        Ar.writeBoolean(bHasCultureInvariantString)
        if (bHasCultureInvariantString) {
            Ar.writeString(this.cultureInvariantString)
        }
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {cultureInvariantString: this.cultureInvariantString}
    }
}

/**
 * FTextHistoryBase
 * @extends {FTextHistory}
 */
export class FTextHistoryBase extends FTextHistory {
    namespace: string
    key: string
    sourceString: string

    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.sourceString
    }

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using namespace, key, sourceString
     * @param {string} namespace Namespace to use
     * @param {string} key Key to use
     * @param {string} sourceString Source string to use
     * @constructor
     * @public
     */
    constructor(namespace: string, key: string, sourceString: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super()
        const x = params[0]
        if (x instanceof FArchive) {
            this.namespace = x.readString()
            this.key = x.readString()
            this.sourceString = x.readString()
        } else {
            this.namespace = x
            this.key = params[1]
            this.sourceString = params[2]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeString(this.namespace)
        Ar.writeString(this.key)
        Ar.writeString(this.sourceString)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            namespace: this.namespace,
            key: this.key,
            sourceString: this.sourceString
        }
    }
}

/**
 * FTextHistoryDateTime
 * @extends {FTextHistory}
 */
export class FTextHistoryDateTime extends FTextHistory {
    /**
     * sourceDateTime
     * @type {FDateTime}
     * @public
     */
    sourceDateTime: FDateTime

    /**
     * dateStyle
     * @type {EDateTimeStyle}
     * @public
     */
    dateStyle: EDateTimeStyle

    /**
     * timeStyle
     * @type {EDateTimeStyle}
     * @public
     */
    timeStyle: EDateTimeStyle

    /**
     * timeZone
     * @type {string}
     * @public
     */
    timeZone: string

    /**
     * targetCulture
     * @type {string}
     * @public
     */
    targetCulture: string

    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return `${this.timeZone}: ${this.sourceDateTime.date}`
    }

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

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
    constructor(
        sourceDateTime: FDateTime,
        dateStyle: EDateTimeStyle,
        timeStyle: EDateTimeStyle,
        timeZone: string,
        targetCulture: string
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super()
        const x = params[0]
        if (x instanceof FArchive) {
            this.sourceDateTime = new FDateTime(x)
            this.dateStyle = x.readInt8()
            this.timeStyle = x.readInt8()
            this.timeZone = x.readString()
            this.targetCulture = x.readString()
        } else {
            this.sourceDateTime = x
            this.dateStyle = params[1]
            this.timeStyle = params[2]
            this.timeZone = params[3]
            this.targetCulture = params[4]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.sourceDateTime.serialize(Ar)
        Ar.writeInt8(this.dateStyle)
        Ar.writeInt8(this.timeStyle)
        Ar.writeString(this.timeZone)
        Ar.writeString(this.targetCulture)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = Object.keys(EDateTimeStyle)
        return {
            sourceDateTime: this.sourceDateTime.toJson(),
            dateStyle: obj[this.dateStyle],
            timeStyle: obj[this.timeStyle],
            timeZone: this.timeZone,
            targetCulture: this.targetCulture
        }
    }
}

/**
 * FTextHistoryOrderedFormat
 * @extends {FTextHistory}
 */
export class FTextHistoryOrderedFormat extends FTextHistory {
    /**
     * sourceFmt
     * @type {FText}
     * @public
     */
    sourceFmt: FText

    /**
     * args
     * @type {Array<FFormatArgumentValue>}
     * @public
     */
    args: FFormatArgumentValue[]

    /**
     * Text
     * @type {string}
     * @public
     */
    get text() {
        return this.sourceFmt.text
    }

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FText} sourceFmt Source fmt to use
     * @param {Array<FFormatArgumentValue>} args Args to use
     * @constructor
     * @public
     */
    constructor(sourceFmt: FText, args: FFormatArgumentValue[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        super()
        if (x instanceof FArchive) {
            this.sourceFmt = new FText(x)
            this.args = x.readArray(() => new FFormatArgumentValue(x))
        } else {
            this.sourceFmt = x
            this.args = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.sourceFmt.serialize(Ar)
        Ar.writeTArray(this.args, (it) => it.serialize(Ar))
    }

    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any {
        return {
            sourceFmt: this.sourceFmt.toJson(locres),
            args: this.args.map(a => a.toJson(locres))
        }
    }
}

/**
 * FTextHistoryFormatNumber
 * @extends {FTextHistory}
 */
export class FTextHistoryFormatNumber extends FTextHistory {
    /**
     * The source value to format from
     * @type {FFormatArgumentValue}
     * @public
     */

    sourceValue: FFormatArgumentValue

    /**
     * The time zone to format using
     * @type {string}
     * @public
     */
    timeZone: string

    /**
     * The culture to format using
     * @type {string}
     * @public
     */
    targetCulture: string

    /**
     * Text
     * @type {string}
     * @public
     */
    get text(): string {
        return this.sourceValue.toString()
    }

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FFormatArgumentValue} sourceValue Source value to use
     * @param {string} timeZone Time zone to use
     * @param {string} targetCulture Targeted culture
     * @constructor
     * @public
     */
    constructor(sourceValue: FFormatArgumentValue, timeZone: string, targetCulture: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any, z?: any) {
        super()
        if (x instanceof FArchive) {
            this.sourceValue = new FFormatArgumentValue(x)
            this.timeZone = x.readString()
            this.targetCulture = x.readString()
        } else {
            this.sourceValue = x
            this.timeZone = y
            this.targetCulture = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.sourceValue.serialize(Ar)
        Ar.writeString(this.timeZone)
        Ar.writeString(this.targetCulture)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            sourceValue: this.sourceValue.toJson(),
            timeZone: this.timeZone,
            targetCulture: this.targetCulture
        }
    }
}

/**
 * FTextHistoryStringTableEntry
 * @extends {FTextHistory}
 */
export class FTextHistoryStringTableEntry extends FTextHistory {
    /**
     * Table ID
     * @type {FName}
     * @public
     */
    tableId: FName

    /**
     * Key
     * @type {string}
     * @public
     */
    key: string

    /**
     * Text
     * @type {string}
     * @public
     */
    text: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FName} tableId Table ID to use
     * @param {string} key Key to use
     * @param {string} text Text to use
     * @constructor
     * @public
     */
    constructor(tableId: FName, key: string, text: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any, z?: any) {
        super()
        if (x instanceof FArchive) {
            if (x instanceof FAssetArchive) {
                this.tableId = x.readFName()
                this.key = x.readString()

                const table = x.provider?.loadObject<UStringTable>(this.tableId.text)
                if (!table)
                    throw new ParserException(`Failed to load string table '${this.tableId}'`, x)

                this.text = table.entries.get(this.key)
                if (!this.text)
                    throw new ParserException("Didn't find needed in key in string table", x)
            } else {
                throw new ParserException("Tried to load a string table entry with wrong archive type", x)
            }
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        if (Ar instanceof FAssetArchiveWriter) {
            Ar.writeFName(this.tableId)
            Ar.writeString(this.key)
        } else {
            throw new ParserException("Tried to save a string table entry with wrong archive type", Ar)
        }
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            tableId: this.tableId.text,
            key: this.key,
            text: this.text
        }
    }
}

export class FFormatArgumentValue {
    /**
     * Type
     * @type {EFormatArgumentType}
     * @public
     */
    type: EFormatArgumentType

    /**
     * Value
     * @type {any}
     * @public
     */
    value: any

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {EFormatArgumentType} type Type to use
     * @param {any} value Value to use
     * @constructor
     * @public
     */
    constructor(type: EFormatArgumentType, value: any)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.type = EDateTimeStyle[Object.keys(EDateTimeStyle)[x.readInt8()]]
            this.value = this.type === EFormatArgumentType.Int ? Number(x.readInt64()) :
                this.type === EFormatArgumentType.UInt ? Number(x.readInt64()) :
                this.type === EFormatArgumentType.Float ? x.readFloat32() :
                this.type === EFormatArgumentType.Double ? x.readDouble() :
                this.type === EFormatArgumentType.Text ? new FText(x) :
                null // this.type === EFormatArgumentType.Gender
        } else {
            this.type = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt8(this.type)
        switch (this.type) {
            case EFormatArgumentType.Int:
                Ar.writeInt64(this.value as number)
                break
            case EFormatArgumentType.UInt:
                Ar.writeUInt64(this.value as number)
                break
            case EFormatArgumentType.Float:
                Ar.writeFloat32(this.value as number)
                break
            case EFormatArgumentType.Double:
                Ar.writeDouble(this.value as number)
                break
            case EFormatArgumentType.Text:
                (this.value as FText).serialize(Ar)
                break
            case EFormatArgumentType.Gender:
                throw new Error("Gender Argument not supported yet")
        }
    }

    /**
     * Turns this into string
     * @returns {string} String
     * @public
     */
    toString() {
        return `[Object FFormatArgumentValue]`
    }

    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres) {
        return {
            value: this.value.toJson
                ? this.value.toJson(locres)
                : this.value,
            type: Object.keys(EFormatArgumentType).filter(k => k.length > 1)[this.type]
        }
    }
}