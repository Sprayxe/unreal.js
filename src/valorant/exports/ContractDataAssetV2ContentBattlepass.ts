import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";

export class ContractDataAssetV2ContentBattlepass extends UObject {
    public Season: FSoftObjectPath
    public PremiumRewardScheduleID: FGuid
    public PremiumVPCost: number
    public Chapters: ContractDataAssetV2ContentBattlepassChapter[]
}

export class ContractDataAssetV2ContentBattlepassChapter {
    public FreeChapterRewards: FPackageIndex[]
    public bIsEpilogue: boolean
    public Levels: ContractDataAssetV2ContentBattlepassChapterLevel[]
}

export class ContractDataAssetV2ContentBattlepassChapterLevel {
    public Reward: FPackageIndex
    public XP: number
    public VPCost: number
    public bPurchasableWithVP: boolean
}