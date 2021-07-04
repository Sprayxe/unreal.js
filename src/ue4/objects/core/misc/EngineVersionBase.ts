/**
 * EVersionComponent
 * @enum
 */
export enum EVersionComponent {
    /** Major version increments introduce breaking API changes. */
    Major,
    /** Minor version increments add additional functionality without breaking existing APIs. */
    Minor,
    /** Patch version increments fix existing functionality without changing the API. */
    Patch,
    /** The pre-release field adds additional versioning through a series of comparable dotted strings or numbers. */
    ChangeList,
    Branch
}

/**
 * EVersionComparison
 * @enum
 */
export enum EVersionComparison {
    Neither,
    First,
    Second
}

/**
 * FEngineVersionBase
 */
export class FEngineVersionBase {
    /**
     * Major version number
     * @type {number}
     * @public
     */
    major: number

    /**
     * Minor version number
     * @type {number}
     * @public
     */
    minor: number

    /**
     * Patch version number
     * @type {number}
     * @public
     */
    patch: number

    /**
     * _changelist
     * @type {number}
     * @private
     */
    private readonly _changelist: number

    /**
     * changelist
     * @type {number}
     * @public
     */
    get changelist() {
        return this._changelist & 0x7fffffff
    }

    /**
     * Creates an instance using values
     * @param {number} major Major version to use
     * @param {number} minor Minor version to use
     * @param {number} patch Path version to use
     * @param {number} _changelist Changelist to use
     * @constructor
     * @public
     */
    constructor(major: number = 0, minor: number = 0, patch: number = 0, _changelist: number = 0) {
        this.major = major
        this.minor = minor
        this.patch = patch
        this._changelist = _changelist
    }

    /**
     * isLicenseeVersion
     * @returns {boolean} Result
     * @public
     */
    isLicenseeVersion() {
        return (this.changelist & 0x80000000) !== 0
    }

    /**
     * isEmpty
     * @returns {boolean} Result
     * @public
     */
    isEmpty() {
        return this.major === 0 && this.minor === 0 && this.patch === 0
    }

    /**
     * hasChangelist
     * @returns {boolean} Result
     * @public
     */
    hasChangelist() {
        return this.changelist !== 0
    }

    /**
     * encodeLicenseeChangelist
     * @param {number} changelist Change list to encode
     * @returns {number} Encoded change list
     * @public
     */
    encodeLicenseeChangelist(changelist: number) {
        return changelist | 0x80000000
    }
}

