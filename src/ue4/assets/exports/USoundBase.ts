import { UObject } from "./UObject";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";

export class USoundBase extends UObject {
    public SoundClassObject: FPackageIndex /*USoundClass*/
    public bDebug: boolean
    public bOverrideConcurrency: boolean
    public bOutputToBusOnly: boolean
    public bHasDelayNode: boolean
    public bHasConcatenatorNode: boolean
    public bBypassVolumeScaleForPriority: boolean
    public VirtualizationMode: EVirtualizationMode
    public ConcurrencyOverrides: FSoundConcurrencySettings
    public Duration: number
    public MaxDistance: number
    public TotalSamples: number
    public Priority: number
    public AttenuationSettings: FPackageIndex /*USoundAttenuation*/
    public VolumeModulationDestination: FSoundModulationDestinationSettings
    public PitchModulationDestination: FSoundModulationDestinationSettings
    public HighpassModulationDestination: FSoundModulationDestinationSettings
    public LowpassModulationDestination: FSoundModulationDestinationSettings
    public SoundSubmixObject: FPackageIndex /*USoundSubmixBase*/
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