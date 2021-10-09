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
import { UProperty } from "../../util/decorators/UProperty";

export class AthenaCharacterItemDefinition extends AthenaCosmeticItemDefinition {
    public RequestedDataStores: UnrealMap<FName, UObject> = null
    public AuthoredVFXData_ByPart: UnrealMap<EFortCustomPartType, MarshalledVFX_AuthoredDataConfig> = null
    public HeroDefinition: FortHeroType = null
    public DefaultBackpack: AthenaBackpackItemDefinition = null
    public RequiredCosmeticItems: AthenaCosmeticItemDefinition[] = null
    public Gender: EFortCustomGender = null
    @UProperty({skipNext: 1})
    public FeedbackBank: FSoftObjectPath = null
    //public Map<GameplayTag, AthenaCharacterTaggedPartsList> TaggedPartsOverride;
}