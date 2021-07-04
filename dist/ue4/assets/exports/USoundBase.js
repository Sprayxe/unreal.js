"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USoundBase = exports.FSoundModulationDestinationSettings = exports.FSoundConcurrencySettings = exports.EConcurrencyVolumeScaleMode = exports.EMaxConcurrentResolutionRule = exports.EVirtualizationMode = void 0;
const UObject_1 = require("./UObject");
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
const UProperty_1 = require("../../../util/decorators/UProperty");
/**
 * EVirtualizationMode
 * @enum
 */
var EVirtualizationMode;
(function (EVirtualizationMode) {
    EVirtualizationMode[EVirtualizationMode["Disabled"] = 0] = "Disabled";
    EVirtualizationMode[EVirtualizationMode["PlayWhenSilent"] = 1] = "PlayWhenSilent";
    EVirtualizationMode[EVirtualizationMode["Restart"] = 2] = "Restart";
})(EVirtualizationMode = exports.EVirtualizationMode || (exports.EVirtualizationMode = {}));
/**
 * EMaxConcurrentResolutionRule
 * @enum
 */
var EMaxConcurrentResolutionRule;
(function (EMaxConcurrentResolutionRule) {
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["PreventNew"] = 0] = "PreventNew";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopOldest"] = 1] = "StopOldest";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopFarthestThenPreventNew"] = 2] = "StopFarthestThenPreventNew";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopFarthestThenOldest"] = 3] = "StopFarthestThenOldest";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopLowestPriority"] = 4] = "StopLowestPriority";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopQuietest"] = 5] = "StopQuietest";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["StopLowestPriorityThenPreventNew"] = 6] = "StopLowestPriorityThenPreventNew";
    EMaxConcurrentResolutionRule[EMaxConcurrentResolutionRule["Count"] = 7] = "Count";
})(EMaxConcurrentResolutionRule = exports.EMaxConcurrentResolutionRule || (exports.EMaxConcurrentResolutionRule = {}));
/**
 * EConcurrencyVolumeScaleMode
 * @enum
 */
var EConcurrencyVolumeScaleMode;
(function (EConcurrencyVolumeScaleMode) {
    EConcurrencyVolumeScaleMode[EConcurrencyVolumeScaleMode["Default"] = 0] = "Default";
    EConcurrencyVolumeScaleMode[EConcurrencyVolumeScaleMode["Distance"] = 1] = "Distance";
    EConcurrencyVolumeScaleMode[EConcurrencyVolumeScaleMode["Priority"] = 2] = "Priority";
})(EConcurrencyVolumeScaleMode = exports.EConcurrencyVolumeScaleMode || (exports.EConcurrencyVolumeScaleMode = {}));
/**
 * FSoundConcurrencySettings
 */
class FSoundConcurrencySettings {
}
exports.FSoundConcurrencySettings = FSoundConcurrencySettings;
/**
 * FSoundModulationDestinationSettings
 */
class FSoundModulationDestinationSettings {
}
exports.FSoundModulationDestinationSettings = FSoundModulationDestinationSettings;
/**
 * Represents an UE4 Sound Base
 * @extends {UObject}
 */
class USoundBase extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Sound class
         * @type {FPackageIndex}
         * @public
         */
        this.SoundClassObject = null;
        /**
         * Whether debug
         * @type {boolean}
         * @public
         */
        this.bDebug = null;
        /**
         * Whether override concurrency
         * @type {boolean}
         * @public
         */
        this.bOverrideConcurrency = null;
        /**
         * Whether output to bus only
         * @type {boolean}
         * @public
         */
        this.bOutputToBusOnly = null;
        /**
         * Whether has delay node
         * @type {boolean}
         * @public
         */
        this.bHasDelayNode = null;
        /**
         * Whether has concatenator node
         * @type {boolean}
         * @public
         */
        this.bHasConcatenatorNode = null;
        /**
         * Whether bypass volume scale for priority
         * @type {boolean}
         * @public
         */
        this.bBypassVolumeScaleForPriority = null;
        /**
         * Virtualization mode
         * @type {EVirtualizationMode}
         * @public
         */
        this.VirtualizationMode = null;
        /**
         * Concurrency overrides
         * @type {FSoundConcurrencySettings}
         * @public
         */
        this.ConcurrencyOverrides = null;
        /**
         * Duration
         * @type {number}
         * @public
         */
        this.Duration = null;
        /**
         * Max distance
         * @type {number}
         * @public
         */
        this.MaxDistance = null;
        /**
         * Total samples
         * @type {number}
         * @public
         */
        this.TotalSamples = null;
        /**
         * Priority
         * @type {number}
         * @public
         */
        this.Priority = null;
        /**
         * Attenuation settings
         * @type {FPackageIndex}
         * @public
         */
        this.AttenuationSettings = null;
        /**
         * Volume modulation destination
         * @type {FSoundModulationDestinationSettings}
         * @public
         */
        this.VolumeModulationDestination = null;
        /**
         * Pitch modulation destination
         * @type {FSoundModulationDestinationSettings}
         * @public
         */
        this.PitchModulationDestination = null;
        /**
         * Highpass modulation destination
         * @type {FSoundModulationDestinationSettings}
         * @public
         */
        this.HighpassModulationDestination = null;
        /**
         * Lowpass modulation destination
         * @type {FSoundModulationDestinationSettings}
         * @public
         */
        this.LowpassModulationDestination = null;
        /**
         * Sound submix
         * @type {FPackageIndex}
         * @public
         */
        this.SoundSubmixObject = null;
        //public List<FSoundSubmixSendInfo> SoundSubmixSends;
        /**
         * Source effect chain
         * @type {FPackageIndex}
         * @public
         */
        this.SourceEffectChain = null;
        //public List<FSoundSourceBusSendInfo> BusSends;
        //public List<FSoundSourceBusSendInfo> PreEffectBusSends;
    }
}
__decorate([
    UProperty_1.UProperty({ skipPrevious: 1, skipNext: 2 }),
    __metadata("design:type", ObjectResource_1.FPackageIndex /*USoundEffectSourcePresetChain*/)
], USoundBase.prototype, "SourceEffectChain", void 0);
exports.USoundBase = USoundBase;
