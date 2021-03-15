export enum EVersionComponent {
    /** Major version increments introduce breaking API changes. */
    Major = "Major",
    /** Minor version increments add additional functionality without breaking existing APIs. */
    Minor = "Minor",
    /** Patch version increments fix existing functionality without changing the API. */
    Patch = "Patch",
    /** The pre-release field adds additional versioning through a series of comparable dotted strings or numbers. */
    ChangeList = "ChangeList",
    Branch = "Branch"
}

export enum EVersionComparison {
    Neither = "Neither",
    First = "First",
    Second = "Second"
}

export class FEngineVersionBase {
    /** Major version number. */
    major: number

    /** Minor version number. */
    minor: number

    /** Patch version number. */
    patch: number

    _changelist: number
    get changelist() {
        return this._changelist & 0x7fffffff
    }

    constructor(major: number = 0, minor: number = 0, patch: number = 0, _changelist: number = 0) {
        this.major = major
        this.minor = minor
        this.patch = patch
        this._changelist = _changelist
    }

    isLicenseeVersion() {
        return (this.changelist & 0x80000000) !== 0
    }

    isEmpty() {
        return this.major === 0 && this.minor === 0 && this.patch === 0
    }

    hasChangelist() {
        return this.changelist !== 0
    }

    encodeLicenseeChangelist(changelist: number) {
        return changelist | 0x80000000
    }
}

