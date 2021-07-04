import { UObject } from "./UObject";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
/**
 * EVirtualizationMode
 * @enum
 */
export declare enum EVirtualizationMode {
    Disabled = 0,
    PlayWhenSilent = 1,
    Restart = 2
}
/**
 * EMaxConcurrentResolutionRule
 * @enum
 */
export declare enum EMaxConcurrentResolutionRule {
    PreventNew = 0,
    StopOldest = 1,
    StopFarthestThenPreventNew = 2,
    StopFarthestThenOldest = 3,
    StopLowestPriority = 4,
    StopQuietest = 5,
    StopLowestPriorityThenPreventNew = 6,
    Count = 7
}
/**
 * EConcurrencyVolumeScaleMode
 * @enum
 */
export declare enum EConcurrencyVolumeScaleMode {
    Default = 0,
    Distance = 1,
    Priority = 2
}
/**
 * FSoundConcurrencySettings
 */
export declare class FSoundConcurrencySettings {
    /**
     * MaxCount
     * @type {number}
     * @public
     */
    MaxCount: number;
    /**
     * bLimitToOwner
     * @type {number}
     * @public
     */
    bLimitToOwner: boolean;
    /**
     * ResolutionRule
     * @type {EMaxConcurrentResolutionRule}
     * @public
     */
    ResolutionRule: EMaxConcurrentResolutionRule;
    /**
     * RetriggerTime
     * @type {number}
     * @public
     */
    RetriggerTime: number;
    /**
     * VolumeScale
     * @type {number}
     * @public
     */
    VolumeScale: number;
    /**
     * VolumeScaleMode
     * @type {EConcurrencyVolumeScaleMode}
     * @public
     */
    VolumeScaleMode: EConcurrencyVolumeScaleMode;
    /**
     * VolumeScaleAttackTime
     * @type {number}
     * @public
     */
    VolumeScaleAttackTime: number;
    /**
     * bVolumeScaleCanRelease
     * @type {boolean}
     * @public
     */
    bVolumeScaleCanRelease: boolean;
    /**
     * VolumeScaleReleaseTime
     * @type {number}
     * @public
     */
    VolumeScaleReleaseTime: number;
    /**
     * VoiceStealReleaseTime
     * @type {number}
     * @public
     */
    VoiceStealReleaseTime: number;
}
/**
 * FSoundModulationDestinationSettings
 */
export declare class FSoundModulationDestinationSettings {
    /**
     * Value
     * @type {number}
     * @public
     */
    Value: number;
    /**
     * Modulator
     * @type {FPackageIndex}
     * @public
     */
    Modulator: FPackageIndex;
}
/**
 * Represents an UE4 Sound Base
 * @extends {UObject}
 */
export declare class USoundBase extends UObject {
    /**
     * Sound class
     * @type {FPackageIndex}
     * @public
     */
    SoundClassObject: FPackageIndex;
    /**
     * Whether debug
     * @type {boolean}
     * @public
     */
    bDebug: boolean;
    /**
     * Whether override concurrency
     * @type {boolean}
     * @public
     */
    bOverrideConcurrency: boolean;
    /**
     * Whether output to bus only
     * @type {boolean}
     * @public
     */
    bOutputToBusOnly: boolean;
    /**
     * Whether has delay node
     * @type {boolean}
     * @public
     */
    bHasDelayNode: boolean;
    /**
     * Whether has concatenator node
     * @type {boolean}
     * @public
     */
    bHasConcatenatorNode: boolean;
    /**
     * Whether bypass volume scale for priority
     * @type {boolean}
     * @public
     */
    bBypassVolumeScaleForPriority: boolean;
    /**
     * Virtualization mode
     * @type {EVirtualizationMode}
     * @public
     */
    VirtualizationMode: EVirtualizationMode;
    /**
     * Concurrency overrides
     * @type {FSoundConcurrencySettings}
     * @public
     */
    ConcurrencyOverrides: FSoundConcurrencySettings;
    /**
     * Duration
     * @type {number}
     * @public
     */
    Duration: number;
    /**
     * Max distance
     * @type {number}
     * @public
     */
    MaxDistance: number;
    /**
     * Total samples
     * @type {number}
     * @public
     */
    TotalSamples: number;
    /**
     * Priority
     * @type {number}
     * @public
     */
    Priority: number;
    /**
     * Attenuation settings
     * @type {FPackageIndex}
     * @public
     */
    AttenuationSettings: FPackageIndex;
    /**
     * Volume modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    VolumeModulationDestination: FSoundModulationDestinationSettings;
    /**
     * Pitch modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    PitchModulationDestination: FSoundModulationDestinationSettings;
    /**
     * Highpass modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    HighpassModulationDestination: FSoundModulationDestinationSettings;
    /**
     * Lowpass modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    LowpassModulationDestination: FSoundModulationDestinationSettings;
    /**
     * Sound submix
     * @type {FPackageIndex}
     * @public
     */
    SoundSubmixObject: FPackageIndex;
    /**
     * Source effect chain
     * @type {FPackageIndex}
     * @public
     */
    SourceEffectChain: FPackageIndex;
}
