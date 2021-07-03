import { UObject } from "./UObject";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UProperty } from "../../../util/decorators/UProperty";

/**
 * EVirtualizationMode
 * @enum
 */
export enum EVirtualizationMode {
    Disabled,
    PlayWhenSilent,
    Restart
}

/**
 * EMaxConcurrentResolutionRule
 * @enum
 */
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

/**
 * EConcurrencyVolumeScaleMode
 * @enum
 */
export enum EConcurrencyVolumeScaleMode {
    Default,
    Distance,
    Priority
}

/**
 * FSoundConcurrencySettings
 */
export class FSoundConcurrencySettings {
    /**
     * MaxCount
     * @type {number}
     * @public
     */
    public MaxCount: number

    /**
     * bLimitToOwner
     * @type {number}
     * @public
     */
    public bLimitToOwner: boolean

    /**
     * ResolutionRule
     * @type {EMaxConcurrentResolutionRule}
     * @public
     */
    public ResolutionRule: EMaxConcurrentResolutionRule

    /**
     * RetriggerTime
     * @type {number}
     * @public
     */
    public RetriggerTime: number

    /**
     * VolumeScale
     * @type {number}
     * @public
     */
    public VolumeScale: number

    /**
     * VolumeScaleMode
     * @type {EConcurrencyVolumeScaleMode}
     * @public
     */
    public VolumeScaleMode: EConcurrencyVolumeScaleMode

    /**
     * VolumeScaleAttackTime
     * @type {number}
     * @public
     */
    public VolumeScaleAttackTime: number

    /**
     * bVolumeScaleCanRelease
     * @type {boolean}
     * @public
     */
    public bVolumeScaleCanRelease: boolean

    /**
     * VolumeScaleReleaseTime
     * @type {number}
     * @public
     */
    public VolumeScaleReleaseTime: number

    /**
     * VoiceStealReleaseTime
     * @type {number}
     * @public
     */
    public VoiceStealReleaseTime: number
}

/**
 * FSoundModulationDestinationSettings
 */
export class FSoundModulationDestinationSettings {
    /**
     * Value
     * @type {number}
     * @public
     */
    public Value: number

    /**
     * Modulator
     * @type {FPackageIndex}
     * @public
     */
    public Modulator: FPackageIndex /*USoundModulatorBase*/
}

/**
 * Represents an UE4 Sound Base
 * @extends {UObject}
 */
export class USoundBase extends UObject {
    /**
     * Sound class
     * @type {FPackageIndex}
     * @public
     */
    public SoundClassObject: FPackageIndex /*USoundClass*/ = null

    /**
     * Wether debug
     * @type {boolean}
     * @public
     */
    public bDebug: boolean = null

    /**
     * Wether override concurrency
     * @type {boolean}
     * @public
     */
    public bOverrideConcurrency: boolean = null

    /**
     * Wether output to bus only
     * @type {boolean}
     * @public
     */
    public bOutputToBusOnly: boolean = null

    /**
     * Wether has delay node
     * @type {boolean}
     * @public
     */
    public bHasDelayNode: boolean = null

    /**
     * Wether has concatenator node
     * @type {boolean}
     * @public
     */
    public bHasConcatenatorNode: boolean = null

    /**
     * Wether bypass volume scale for priority
     * @type {boolean}
     * @public
     */
    public bBypassVolumeScaleForPriority: boolean = null

    /**
     * Virtualization mode
     * @type {EVirtualizationMode}
     * @public
     */
    public VirtualizationMode: EVirtualizationMode = null

    /**
     * Concurrency overrides
     * @type {FSoundConcurrencySettings}
     * @public
     */
    public ConcurrencyOverrides: FSoundConcurrencySettings = null

    /**
     * Duration
     * @type {number}
     * @public
     */
    public Duration: number = null

    /**
     * Max distance
     * @type {number}
     * @public
     */
    public MaxDistance: number = null

    /**
     * Total samples
     * @type {number}
     * @public
     */
    public TotalSamples: number = null

    /**
     * Priority
     * @type {number}
     * @public
     */
    public Priority: number = null

    /**
     * Attenuation settings
     * @type {FPackageIndex}
     * @public
     */
    public AttenuationSettings: FPackageIndex /*USoundAttenuation*/ = null

    /**
     * Volume modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    public VolumeModulationDestination: FSoundModulationDestinationSettings = null

    /**
     * Pitch modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    public PitchModulationDestination: FSoundModulationDestinationSettings = null

    /**
     * Highpass modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    public HighpassModulationDestination: FSoundModulationDestinationSettings = null

    /**
     * Lowpass modulation destination
     * @type {FSoundModulationDestinationSettings}
     * @public
     */
    public LowpassModulationDestination: FSoundModulationDestinationSettings = null

    /**
     * Sound submix
     * @type {FPackageIndex}
     * @public
     */
    public SoundSubmixObject: FPackageIndex /*USoundSubmixBase*/ = null
    //public List<FSoundSubmixSendInfo> SoundSubmixSends;

    /**
     * Source effect chain
     * @type {FPackageIndex}
     * @public
     */
    @UProperty({skipPrevious: 1, skipNext: 2})
    public SourceEffectChain: FPackageIndex /*USoundEffectSourcePresetChain*/ = null
    //public List<FSoundSourceBusSendInfo> BusSends;
    //public List<FSoundSourceBusSendInfo> PreEffectBusSends;
}