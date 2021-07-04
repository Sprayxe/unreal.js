"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEngineVersionBase = exports.EVersionComparison = exports.EVersionComponent = void 0;
/**
 * EVersionComponent
 * @enum
 */
var EVersionComponent;
(function (EVersionComponent) {
    /** Major version increments introduce breaking API changes. */
    EVersionComponent[EVersionComponent["Major"] = 0] = "Major";
    /** Minor version increments add additional functionality without breaking existing APIs. */
    EVersionComponent[EVersionComponent["Minor"] = 1] = "Minor";
    /** Patch version increments fix existing functionality without changing the API. */
    EVersionComponent[EVersionComponent["Patch"] = 2] = "Patch";
    /** The pre-release field adds additional versioning through a series of comparable dotted strings or numbers. */
    EVersionComponent[EVersionComponent["ChangeList"] = 3] = "ChangeList";
    EVersionComponent[EVersionComponent["Branch"] = 4] = "Branch";
})(EVersionComponent = exports.EVersionComponent || (exports.EVersionComponent = {}));
/**
 * EVersionComparison
 * @enum
 */
var EVersionComparison;
(function (EVersionComparison) {
    EVersionComparison[EVersionComparison["Neither"] = 0] = "Neither";
    EVersionComparison[EVersionComparison["First"] = 1] = "First";
    EVersionComparison[EVersionComparison["Second"] = 2] = "Second";
})(EVersionComparison = exports.EVersionComparison || (exports.EVersionComparison = {}));
/**
 * FEngineVersionBase
 */
class FEngineVersionBase {
    /**
     * Creates an instance using values
     * @param {number} major Major version to use
     * @param {number} minor Minor version to use
     * @param {number} patch Path version to use
     * @param {number} _changelist Changelist to use
     * @constructor
     * @public
     */
    constructor(major = 0, minor = 0, patch = 0, _changelist = 0) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this._changelist = _changelist;
    }
    /**
     * changelist
     * @type {number}
     * @public
     */
    get changelist() {
        return this._changelist & 0x7fffffff;
    }
    /**
     * isLicenseeVersion
     * @returns {boolean} Result
     * @public
     */
    isLicenseeVersion() {
        return (this.changelist & 0x80000000) !== 0;
    }
    /**
     * isEmpty
     * @returns {boolean} Result
     * @public
     */
    isEmpty() {
        return this.major === 0 && this.minor === 0 && this.patch === 0;
    }
    /**
     * hasChangelist
     * @returns {boolean} Result
     * @public
     */
    hasChangelist() {
        return this.changelist !== 0;
    }
    /**
     * encodeLicenseeChangelist
     * @param {number} changelist Change list to encode
     * @returns {number} Encoded change list
     * @public
     */
    encodeLicenseeChangelist(changelist) {
        return changelist | 0x80000000;
    }
}
exports.FEngineVersionBase = FEngineVersionBase;
