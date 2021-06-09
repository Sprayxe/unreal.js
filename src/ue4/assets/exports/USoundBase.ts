import { UObject } from "./UObject";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UProperty } from "../../../util/decorators/UProperty";

export class USoundBase extends UObject {
    public SoundClassObject: FPackageIndex /*USoundClass*/ = null
    public bDebug: boolean = null
    public bOverrideConcurrency: boolean = null
    public bOutputToBusOnly: boolean = null
    public bHasDelayNode: boolean = null
    public bHasConcatenatorNode: boolean = null
    public bBypassVolumeScaleForPriority: boolean = null
    public VirtualizationMode: EVirtualizationMode = null
    public ConcurrencyOverrides: FSoundConcurrencySettings = null
    public Duration: number = null
    public MaxDistance: number = null
    public TotalSamples: number = null
    public Priority: number = null
    public AttenuationSettings: FPackageIndex /*USoundAttenuation*/ = null
    public VolumeModulationDestination: FSoundModulationDestinationSettings = null
    public PitchModulationDestination: FSoundModulationDestinationSettings = null
    public HighpassModulationDestination: FSoundModulationDestinationSettings = null
    public LowpassModulationDestination: FSoundModulationDestinationSettings = null
    public SoundSubmixObject: FPackageIndex /*USoundSubmixBase*/ = null
    //public List<FSoundSubmixSendInfo> SoundSubmixSends;
    @UProperty({ skipPrevious: 1, skipNext: 2 })
    public SourceEffectChain: FPackageIndex /*USoundEffectSourcePresetChain*/ = null
    //public List<FSoundSourceBusSendInfo> BusSends;
    //public List<FSoundSourceBusSendInfo> PreEffectBusSends;
}

export enum EVirtualizationMode {
    Disabled,
    PlayWhenSilent,
    Restart
}

export class FSoundConcurrencySettings {
    public MaxCount: number
    public bLimitToOwner: boolean
    public ResolutionRule: EMaxConcurrentResolutionRule
    public RetriggerTime: number
    public VolumeScale: number
    public VolumeScaleMode: EConcurrencyVolumeScaleMode
    public VolumeScaleAttackTime: number
    public bVolumeScaleCanRelease: boolean
    public VolumeScaleReleaseTime: number
    public VoiceStealReleaseTime: number
}

export enum EMaxConcurrentResolutionRule {
    PreventNew,
    StopOldest,
    StopFarthestThenPreventNew,
    StopFarthestThenOldest,
    StopLowestPriority,
    StopQuietest,
    StopLowestPriorityThenPreventNew,
    Count
}

export enum EConcurrencyVolumeScaleMode {
    Default,
    Distance,
    Priority
}

export class FSoundModulationDestinationSettings {
    public Value: number
    public Modulator: FPackageIndex /*USoundModulatorBase*/
}