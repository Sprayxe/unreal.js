import { UObject } from "./UObject";

export class UStreamableRenderAsset extends UObject {
    public ForceMipLevelsToBeResidentTimestamp: number
    public NumCinematicMipLevels: number
    public StreamingIndex: number
    public CachedCombinedLODBias: number
    public CachedNumResidentLODs: boolean
    public bCachedReadyForStreaming: boolean
    public NeverStream: boolean
    public bGlobalForceMipLevelsToBeResident: boolean
    public bIsStreamable: boolean
    public bHasStreamingUpdatePending: boolean
    public bForceMiplevelsToBeResident: boolean
    public bIgnoreStreamingMipBias: boolean
    public bUseCinematicMipLevels: boolean
}