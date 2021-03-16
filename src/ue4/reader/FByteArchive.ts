import { FArchive } from "./FArchive";

export class FByteArchive extends FArchive {
    constructor(data: Buffer) {
        super(data)
    }

    clone(): FByteArchive {
        const clone = new FByteArchive(this.data)
        clone.pos = this.pos
        return clone
    }
}