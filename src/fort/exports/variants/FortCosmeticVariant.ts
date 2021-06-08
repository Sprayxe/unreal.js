import { UObject } from "../../../ue4/assets/exports/UObject";
import { FGameplayTag } from "../../../ue4/objects/gameplaytags/FGameplayTag";
import { FText } from "../../../ue4/objects/core/i18n/Text";

export class FortCosmeticVariant extends UObject {
    public VariantChannelTag: FGameplayTag
    public VariantChannelName: FText
    public ActiveChannelTag: FGameplayTag
}