/**
 * EVersionComponent
 * @enum
 */
export declare enum EVersionComponent {
    /** Major version increments introduce breaking API changes. */
    Major = 0,
    /** Minor version increments add additional functionality without breaking existing APIs. */
    Minor = 1,
    /** Patch version increments fix existing functionality without changing the API. */
    Patch = 2,
    /** The pre-release field adds additional versioning through a series of comparable dotted strings or numbers. */
    ChangeList = 3,
    Branch = 4
}
/**
 * EVersionComparison
 * @enum
 */
export declare enum EVersionComparison {
    Neither = 0,
    First = 1,
    Second = 2
}
/**
 * FEngineVersionBase
 */
export declare class FEngineVersionBase {
    /**
     * Major version number
     * @type {number}
     * @public
     */
    major: number;
    /**
     * Minor version number
     * @type {number}
     * @public
     */
    minor: number;
    /**
     * Patch version number
     * @type {number}
     * @public
     */
    patch: number;
    /**
     * _changelist
     * @type {number}
     * @private
     */
    private readonly _changelist;
    /**
     * changelist
     * @type {number}
     * @public
     */
    get changelist(): number;
    /**
     * Creates an instance using values
     * @param {number} major Major version to use
     * @param {number} minor Minor version to use
     * @param {number} patch Path version to use
     * @param {number} _changelist Changelist to use
     * @constructor
     * @public
     */
    constructor(major?: number, minor?: number, patch?: number, _changelist?: number);
    /**
     * isLicenseeVersion
     * @returns {boolean} Result
     * @public
     */
    isLicenseeVersion(): boolean;
    /**
     * isEmpty
     * @returns {boolean} Result
     * @public
     */
    isEmpty(): boolean;
    /**
     * hasChangelist
     * @returns {boolean} Result
     * @public
     */
    hasChangelist(): boolean;
    /**
     * encodeLicenseeChangelist
     * @param {number} changelist Change list to encode
     * @returns {number} Encoded change list
     * @public
     */
    encodeLicenseeChangelist(changelist: number): number;
}
