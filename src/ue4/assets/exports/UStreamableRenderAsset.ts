import { UObject } from "./UObject";

/**
 * UStreamableRenderAsset
 * @extends {UObject}
 */
export class UStreamableRenderAsset extends UObject {
    /**
     * ForceMipLevelsToBeResidentTimestamp
     * @type {number}
     * @public
     */
    public ForceMipLevelsToBeResidentTimestamp: number

    /**
     * NumCinematicMipLevels
     * @type {number}
     * @public
     */
    public NumCinematicMipLevels: number

    /**
     * StreamingIndex
     * @type {number}
     * @public
     */
    public StreamingIndex: number

    /**
     * CachedCombinedLODBias
     * @type {number}
     * @public
     */
    public CachedCombinedLODBias: number

    /**
     * CachedNumResidentLODs
     * @type {boolean}
     * @public
     */
    public CachedNumResidentLODs: boolean

    /**
     * bCachedReadyForStreaming
     * @type {boolean}
     * @public
     */
    public bCachedReadyForStreaming: boolean

    /**
     * NeverStream
     * @type {boolean}
     * @public
     */
    public NeverStream: boolean

    /**
     * bGlobalForceMipLevelsToBeResident
     * @type {boolean}
     * @public
     */
    public bGlobalForceMipLevelsToBeResident: boolean

    /**
     * bIsStreamable
     * @type {boolean}
     * @public
     */
    public bIsStreamable: boolean

    /**
     * bHasStreamingUpdatePending
     * @type {boolean}
     * @public
     */
    public bHasStreamingUpdatePending: boolean

    /**
     * bForceMiplevelsToBeResident
     * @type {boolean}
     * @public
     */
    public bForceMiplevelsToBeResident: boolean

    /**
     * bIgnoreStreamingMipBias
     * @type {boolean}
     * @public
     */
    public bIgnoreStreamingMipBias: boolean

    /**
     * bUseCinematicMipLevels
     * @type {boolean}
     * @public
     */
    public bUseCinematicMipLevels: boolean
}