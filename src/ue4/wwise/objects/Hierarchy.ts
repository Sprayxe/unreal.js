import { EHierarchyObjectType } from "../enums/EHierarchyObjectType";
import { AbstractHierarchy } from "./AbstractHierarchy";
import { FArchive } from "../../reader/FArchive";

export class Hierarchy {
    public readonly type: EHierarchyObjectType
    public readonly length: number
    public readonly data: AbstractHierarchy

    constructor(Ar: FArchive) {
        this.type = Ar.readInt32()
        this.length = Ar.readInt32()
        Ar.pos += this.length // remove this if you want to read additional data
        this.data = null // TODO implement hierarchy types
    }

    toJson() {
        return {
            type: Object.keys(EHierarchyObjectType).find(e => EHierarchyObjectType[e] === this.type), // gets string
            length: this.length,
            data: this.data?.toJson()
        }
    }
}