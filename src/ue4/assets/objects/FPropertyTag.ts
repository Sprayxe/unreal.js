import { FName } from "../../objects/uobject/FName";
import { INDEX_NONE } from "../../../util/Const";
import Long from "long"
import { FGuid } from "../../objects/core/misc/Guid";
import {
    VER_UE4_ARRAY_PROPERTY_INNER_TAGS, VER_UE4_PROPERTY_GUID_IN_PROPERTY_TAG,
    VER_UE4_PROPERTY_TAG_SET_MAP_SUPPORT,
    VER_UE4_STRUCT_GUID_IN_PROPERTY_TAG
} from "../../versions/Versions";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FProperty } from "./FProperty";

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
    sizeOffset = new Long(-1)
    structGuid?: FGuid = null
    hasPropertyGuid: boolean = false
    propertyGuid?: FGuid = null

    constructor(name: FName)
    constructor(Ar: FAssetArchive, readData: boolean)
    constructor(x: any, y?: any) {
        if (x instanceof FName) {
            this.name = x
        } else {
            this.name = x.readFName()
            if (!this.name.isNone()) {
                this.type = x.readFName()
                this.size = x.readInt32()
                this.arrayIndex = x.readInt32()
                const tagType = this.type.text

                if (tagType === "StructType") {
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


            }
        }
    }
}