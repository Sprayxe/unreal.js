import { UObject } from "./UObject";
/**
 * UStreamableRenderAsset
 * @extends {UObject}
 */
export declare class UStreamableRenderAsset extends UObject {
    /**
     * ForceMipLevelsToBeResidentTimestamp
     * @type {number}
     * @public
     */
    ForceMipLevelsToBeResidentTimestamp: number;
    /**
     * NumCinematicMipLevels
     * @type {number}
     * @public
     */
    NumCinematicMipLevels: number;
    /**
     * StreamingIndex
     * @type {number}
     * @public
     */
    StreamingIndex: number;
    /**
     * CachedCombinedLODBias
     * @type {number}
     * @public
     */
    CachedCombinedLODBias: number;
    /**
     * CachedNumResidentLODs
     * @type {boolean}
     * @public
     */
    CachedNumResidentLODs: boolean;
    /**
     * bCachedReadyForStreaming
     * @type {boolean}
     * @public
     */
    bCachedReadyForStreaming: boolean;
    /**
     * NeverStream
     * @type {boolean}
     * @public
     */
    NeverStream: boolean;
    /**
     * bGlobalForceMipLevelsToBeResident
     * @type {boolean}
     * @public
     */
    bGlobalForceMipLevelsToBeResident: boolean;
    /**
     * bIsStreamable
     * @type {boolean}
     * @public
     */
    bIsStreamable: boolean;
    /**
     * bHasStreamingUpdatePending
     * @type {boolean}
     * @public
     */
    bHasStreamingUpdatePending: boolean;
    /**
     * bForceMiplevelsToBeResident
     * @type {boolean}
     * @public
     */
    bForceMiplevelsToBeResident: boolean;
    /**
     * bIgnoreStreamingMipBias
     * @type {boolean}
     * @public
     */
    bIgnoreStreamingMipBias: boolean;
    /**
     * bUseCinematicMipLevels
     * @type {boolean}
     * @public
     */
    bUseCinematicMipLevels: boolean;
}
