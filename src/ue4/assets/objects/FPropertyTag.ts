import { FName } from "../../objects/uobject/FName";
import { INDEX_NONE } from "../../../util/Const";
import Long from "long"

export class FPropertyTag {
    prop: any = null

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
    
}