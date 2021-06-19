import { FName } from "../../objects/uobject/FName";
import { INDEX_NONE } from "../../../util/Const";
import { EGuidFormats, FGuid } from "../../objects/core/misc/Guid";
import {
    VER_UE4_ARRAY_PROPERTY_INNER_TAGS,
    VER_UE4_PROPERTY_GUID_IN_PROPERTY_TAG,
    VER_UE4_PROPERTY_TAG_SET_MAP_SUPPORT,
    VER_UE4_STRUCT_GUID_IN_PROPERTY_TAG
} from "../../versions/Versions";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FProperty, ReadType } from "./FProperty";
import { PropertyType } from "./PropertyType";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { ParserException } from "../../../exceptions/Exceptions";

export class FPropertyTag {
    prop: FProperty = null

    /** Type of property */
    type: FName
    /** A boolean property's value (never need to serialize data for bool properties except here) */
    boolVal: boolean = false
    /** Name of property. */
    name: FName
    /** Struct name if FStructProperty. */
    structName = FName.NAME_None
    /** Enum name if FByteProperty or FEnumProperty */
    enumName = FName.NAME_None
    /** Inner type if FArrayProperty, FSetProperty, or FMapProperty */
    innerType = FName.NAME_None
    /** Value type if UMapProperty */
    valueType = FName.NAME_None
    /** Property size. */
    size: number = 0
    /** Index if an array; else 0. */
    arrayIndex = INDEX_NONE
    /** Location in stream of tag size member */
    sizeOffset = -1
    structGuid?: FGuid = null
    hasPropertyGuid: boolean = false
    propertyGuid?: FGuid = null

    typeData: PropertyType = null

    constructor(name: FName)
    constructor(Ar: FAssetArchive, readData: boolean)
    constructor(x: any, y?: any) {
        if (!(x instanceof FAssetArchive)) {
            this.name = x
        } else {
            this.name = x.readFName()
            if (!this.name.isNone()) {
                this.type = x.readFName()
                this.size = x.readInt32()
                this.arrayIndex = x.readInt32()

                const tagType = this.type.text
                if (tagType === "StructProperty") {
                    this.structName = x.readFName()
                    if (x.ver >= VER_UE4_STRUCT_GUID_IN_PROPERTY_TAG)
                        this.structGuid = new FGuid(x)
                } else if (tagType === "BoolProperty") { // only need to serialize this for bools
                    this.boolVal = x.readFlag()
                } else if (tagType === "ByteProperty") { // only need to serialize this for bytes/enums
                    this.enumName = x.readFName()
                } else if (tagType === "EnumProperty") {
                    this.enumName = x.readFName()
                } else if (tagType === "ArrayProperty") { // only need to serialize this for arrays
                    if (x.ver >= VER_UE4_ARRAY_PROPERTY_INNER_TAGS)
                        this.innerType = x.readFName()
                } else if (x.ver >= VER_UE4_PROPERTY_TAG_SET_MAP_SUPPORT) {
                    if (tagType === "SetProperty") {
                        this.innerType = x.readFName()
                    } else if (tagType === "MapProperty") {
                        this.innerType = x.readFName() // MapProperty doesn't seem to store the inner types as their types when they're UStructs.
                        this.valueType = x.readFName()
                    }
                }

                // Property tags to handle renamed blueprint properties effectively.
                if (x.ver >= VER_UE4_PROPERTY_GUID_IN_PROPERTY_TAG) {
                    this.hasPropertyGuid = x.readFlag()
                    if (this.hasPropertyGuid)
                        this.propertyGuid = new FGuid(x)
                }

                this.typeData = new PropertyType(this)

                if (y) {
                    const pos = x.pos
                    const finalPos = pos + this.size
                    try {
                        this.prop =
                            FProperty.readPropertyValue(
                                x, this.typeData,
                                ReadType.NORMAL
                            )
                        if (finalPos !== x.pos) {
                            console.warn(`FPropertyTagType ${this.name} (${this.type}) was not read properly, pos ${x.pos}, calculated pos ${finalPos}`)
                        }
                        // Even if the property wasn't read properly
                        // we don't need to crash here because we know the expected size
                        x.pos = finalPos
                    } catch (e) {
                        if (finalPos !== x.pos) {
                            console.warn(`Failed to read FPropertyTagType ${this.name} (${this.type}), skipping it, please report`)
                        }
                        // Also no need to crash here, just seek to the desired offset
                        x.pos = finalPos
                    }
                }
            }
        }
    }

    getTagTypeValue(): any {
        const tag = this.prop?.getTagTypeValue()
        if (tag == null)
            throw new Error("This tag was read without data")
        return tag
    }

    setTagTypeValue(value: any) {
        return this.prop?.setTagTypeValue(value)
    }

    serialize(Ar: FAssetArchiveWriter, writeData: boolean) {
        Ar.writeFName(this.name)
        if (this.name.text !== "None") {
            Ar.writeFName(this.type)
            let tagTypeData: Buffer | false = null
            if (writeData) {
                const tempAr = Ar.setupByteArrayWriter()
                try {
                    if (!this.prop)
                        throw ParserException("FPropertyTagType is needed when trying to write it")
                    FProperty.writePropertyValue(
                        tempAr,
                        this.prop,
                        ReadType.NORMAL
                    )
                    Ar.writeInt32(tempAr.pos() - Ar.pos())
                    tagTypeData = tempAr.toByteArray()
                } catch (e) {
                    console.error(e)
                    throw ParserException(`^^^\nError occurred while writing the FPropertyTagType ${this.name} (${this.type})`)
                }
            } else {
                Ar.writeInt32(this.size)
            }

            Ar.writeInt32(this.arrayIndex)
            // TODO tagData?.serialize(Ar)

            Ar.writeFlag(this.hasPropertyGuid)
            if (this.hasPropertyGuid)
                this.propertyGuid.serialize(Ar)

            if (writeData) {
                if (tagTypeData) {
                    Ar.write(tagTypeData)
                }
            }
        }
    }

    toString() {
        const result = this.prop ? this.getTagTypeValue(): "Failed to parse"
        return `${this.name.text}   -->   ${result.toString()}`
    }

    toJson() {
        return {
            prop: this.prop.toJsonValue(),
            type: this.type.text,
            boolVal: this.boolVal,
            name: this.name.text,
            structName: this.structName.text,
            enumName: this.enumName.text,
            innerType: this.innerType.text,
            valueType: this.valueType.text,
            size: this.size,
            arrayIndex: this.arrayIndex,
            sizeOffset: this.sizeOffset,
            structGuid: this.structGuid?.toString(EGuidFormats.DigitsWithHyphens) || null,
            hasPropertyGuid: this.hasPropertyGuid,
            propertyGuid: this.propertyGuid?.toString(EGuidFormats.DigitsWithHyphens) || null,
            typeData: this.typeData.toString()
        }
    }
}