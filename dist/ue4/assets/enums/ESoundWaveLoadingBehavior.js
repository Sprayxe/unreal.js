"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESoundWaveLoadingBehavior = void 0;
/**
 * ESoundWaveLoadingBehavior
 * @enum
 */
var ESoundWaveLoadingBehavior;
(function (ESoundWaveLoadingBehavior) {
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["Inherited"] = 0] = "Inherited";
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["RetainOnLoad"] = 1] = "RetainOnLoad";
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["PrimeOnLoad"] = 2] = "PrimeOnLoad";
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["LoadOnDemand"] = 3] = "LoadOnDemand";
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["ForceInline"] = 4] = "ForceInline";
    ESoundWaveLoadingBehavior[ESoundWaveLoadingBehavior["Uninitialized"] = 5] = "Uninitialized";
})(ESoundWaveLoadingBehavior = exports.ESoundWaveLoadingBehavior || (exports.ESoundWaveLoadingBehavior = {}));
