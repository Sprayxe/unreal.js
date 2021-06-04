import { FArchive } from "../../reader/FArchive";

export class AkEntry {
    public readonly nameHash: number
    public readonly offsetMultiplier: number
    public readonly size: number
    public readonly offset: number
    public readonly folderId: number
    public path: string
    public isSoundBank: boolean
    public data: Buffer

    constructor(Ar: FArchive) {
        this.nameHash = Ar.readUInt32()
        this.offsetMultiplier = Ar.readUInt32()
        this.size = Ar.readInt32()
        this.offset = Ar.readUInt32()
        this.folderId = Ar.readUInt32()
    }

    toJson() {
        return {
            nameHash: this.nameHash,
            offsetMultiplier: this.offsetMultiplier,
            size: this.size,
            offset: this.offset,
            folderId: this.folderId,
            path: this.path,
            isSoundBank: this.isSoundBank
        }
    }
}