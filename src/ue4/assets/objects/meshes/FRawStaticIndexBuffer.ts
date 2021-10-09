import { FArchive } from "../../../reader/FArchive";
import { VER_UE4_SUPPORT_32BIT_STATIC_MESH_INDICES } from "../../../versions/Versions";
import { FByteArchive } from "../../../reader/FByteArchive";

export class FRawStaticIndexBuffer {
    public indices16: number[]
    public indices32: number[]

    public constructor()
    public constructor(indices16: number[], indices32: number[])
    public constructor(Ar: FArchive)
    public constructor(...args) {
        const arg = args[0]
        if (arg != null) {
            if (arg instanceof FArchive) {
                if (arg.ver < VER_UE4_SUPPORT_32BIT_STATIC_MESH_INDICES) {
                    this.indices16 = arg.readBulkArray(() => arg.readUInt16())
                    this.indices32 = []
                } else {
                    // serialize all indices as byte array
                    const is32Bit = arg.readBoolean()
                    const data = arg.readBulkByteArray()
                    if (arg.versions.get("awIndexBuffer.HasShouldExpandTo32Bit"))
                        arg.readBoolean()

                    if (data.length === 0) {
                        this.indices16 = []
                        this.indices32 = []
                        return
                    }

                    if (is32Bit) {
                        const count = data.length / 4
                        const tempAr = new FByteArchive(data)
                        tempAr.littleEndian = arg.littleEndian

                        this.indices32 = new Array(count)
                        for (let i = 0; i < count; ++i)
                            this.indices32[i] = tempAr.readUInt32()

                        this.indices16 = []
                    } else {
                        const count = data.length / 4
                        const tempAr = new FByteArchive(data)
                        tempAr.littleEndian = arg.littleEndian

                        this.indices16 = new Array(count)
                        for (let i = 0; i < count; ++i)
                            this.indices16[i] = tempAr.readUInt16()

                        this.indices32 = []
                    }
                }
            } else {
                this.indices16 = arg
                this.indices32 = args[1]
            }
        } else {
            this.indices16 = []
            this.indices32 = []
        }
    }
}