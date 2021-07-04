import { UPrimaryDataAsset } from "../../ue4/assets/exports/UPrimaryDataAsset";
import { FText } from "../../ue4/objects/core/i18n/Text";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FortColorPalette } from "../objects/FortColorPalette";
export declare class FortItemSeriesDefinition extends UPrimaryDataAsset {
    DisplayName: FText;
    Colors: FortColorPalette;
    BackgroundTexture: FSoftObjectPath;
    ItemCardMaterial: FSoftObjectPath;
    BackgroundMaterial: FSoftObjectPath;
}
