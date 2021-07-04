import { AthenaCosmeticItemDefinition } from "./AthenaCosmeticItemDefinition";
import { UnrealMap } from "../../util/UnrealMap";
import { FName } from "../../ue4/objects/uobject/FName";
import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { EFortCustomPartType } from "../enums/EFortCustomPartType";
import { EFortCustomGender } from "../enums/EFortCustomGender";
import { AthenaBackpackItemDefinition } from "./AthenaBackpackItemDefinition";
import { FortHeroType } from "./FortHeroType";
import { MarshalledVFX_AuthoredDataConfig } from "./MarshalledVFX_AuthoredDataConfig";
export declare class AthenaCharacterItemDefinition extends AthenaCosmeticItemDefinition {
    RequestedDataStores: UnrealMap<FName, UObject>;
    AuthoredVFXData_ByPart: UnrealMap<EFortCustomPartType, MarshalledVFX_AuthoredDataConfig>;
    HeroDefinition: FortHeroType;
    DefaultBackpack: AthenaBackpackItemDefinition;
    RequiredCosmeticItems: AthenaCosmeticItemDefinition[];
    Gender: EFortCustomGender;
    FeedbackBank: FSoftObjectPath;
}
