import { FArchive } from "./FArchive";

/**
 * Byte Reader for UE4
 * @extends {FArchive}
 */
export class FByteArchive extends FArchive {
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to reader
     * @constructor
     * @public
     */
    constructor(data: Buffer) {
        super(data)
    }

    /**
     * Clones this instance
     * @returns {FByteArchive}
     * @public
     */
    clone(): FByteArchive {
        const clone = new FByteArchive(this.data)
        clone.pos = this.pos
        return clone
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string {
        return super.printError()
            .replace("FArchive", "FByteArchive")
    }
}