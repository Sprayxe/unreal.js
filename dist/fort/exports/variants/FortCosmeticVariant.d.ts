import { UObject } from "../../../ue4/assets/exports/UObject";
import { FGameplayTag } from "../../../ue4/objects/gameplaytags/FGameplayTag";
import { FText } from "../../../ue4/objects/core/i18n/Text";
export declare class FortCosmeticVariant extends UObject {
    VariantChannelTag: FGameplayTag;
    VariantChannelName: FText;
    ActiveChannelTag: FGameplayTag;
}
