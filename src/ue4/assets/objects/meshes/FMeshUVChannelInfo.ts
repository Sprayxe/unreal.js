import { UProperty } from "../../../../util/decorators/UProperty";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FMeshUVChannelInfo {
    private static readonly TEXSTREAM_MAX_NUM_UVCHANNELS = 4

    @UProperty({name: "bInitialized"})
    public initialized: boolean = false
    @UProperty({name: "bOverrideDensities"})
    public overrideDensities: boolean = false
    @UProperty({name: "LocalUVDensities", arrayDim: FMeshUVChannelInfo.TEXSTREAM_MAX_NUM_UVCHANNELS})
    public localUVDensities: number[] = []

    constructor(Ar?: FArchive) {
        if (Ar != null) {
            this.initialized = Ar.readBoolean()
            this.overrideDensities = Ar.readBoolean()
            this.localUVDensities = Array(FMeshUVChannelInfo.TEXSTREAM_MAX_NUM_UVCHANNELS)
            for (let i = 0; i < FMeshUVChannelInfo.TEXSTREAM_MAX_NUM_UVCHANNELS; ++i)
                this.localUVDensities[i] = Ar.readFloat32()
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeBoolean(this.initialized)
        Ar.writeBoolean(this.overrideDensities)
        this.localUVDensities.forEach((it) => Ar.writeFloat32(it))
    }
}