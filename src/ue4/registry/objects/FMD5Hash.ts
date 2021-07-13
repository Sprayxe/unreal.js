import { FArchive } from "../../reader/FArchive";

export class FMD5Hash {
    hash?: Buffer
    constructor(Ar: FArchive) {
        this.hash = Ar.readInt32() !== 0 ? Ar.read(16) : null
    }
}