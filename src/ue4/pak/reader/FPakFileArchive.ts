import { FPakArchive } from "./FPakArchive";
import { File } from "../../../util/File";

export class FPakFileArchive extends FPakArchive {
    rafile: Buffer
    file: File
    protected position = 0

    constructor(rafile: Buffer, file: File) {
        super(file.name)
        this.rafile = rafile
        this.file = file
    }

    skip(n: number): number {
        this.position += n
        return this.position
    }

    seek(n: number) {
        this.position = n
        return n
    }

    clone(): FPakFileArchive {
        const clone = new FPakFileArchive(this.rafile, this.file)
        if (this.hasPakInfo)
            return clone.pakInfo = this.pakInfo
        return clone
    }

    pakSize() {
        return this.rafile.length
    }
    get size() {
        return this.pakSize()
    }

    pakPos() {
        return this.position
    }
    get pos(): number {
        return this.pakPos()
    }

    printError(): string {
        return `FPakArchive Info: pos ${this.pakPos()}, stopper ${this.pakSize()}, file ${this.file.name}`
    }
}
