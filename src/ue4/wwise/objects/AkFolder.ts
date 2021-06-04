import { AkEntry } from "./AkEntry";
import { FArchive } from "../../reader/FArchive";

export class AkFolder {
    public readonly offset: number
    public readonly id: number
    public name: string
    public entries: AkEntry[]

    constructor(Ar: FArchive) {
        this.offset = Ar.readUInt32()
        this.id = Ar.readUInt32()
    }

    populateName(Ar: FArchive): void {
        let str = ""
        while (true) {
            try {
                const c = Ar.readString()
                if (c === "")
                    break
                str += c
            } catch {
                break;
            }
        }
        this.name = str
    }

    toJson() {
        return {
            offset: this.offset,
            id: this.id,
            name: this.name,
            entries: this.entries.map(e => e.toJson())
        }
    }
}