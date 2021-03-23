import { FPakArchive } from "./FPakArchive";
import { File } from "../../../util/File";

export class FBytePakArchive extends FPakArchive {
    data: Buffer
    fileName: string
    offsetInPakFile: number
    pakFileSize: number

    constructor(data: Buffer, fileName: string, offsetInPakFile: number, pakFileSize: number) {
        super(new File(fileName, data))
        this.data = data
        this.fileName = fileName
        this.offsetInPakFile = offsetInPakFile
        this.pakFileSize = pakFileSize
    }

    protected position = 0
    littleEndian = true

    get pos() {
        return this.position
    }
    seek(v: number) {
        this.position = v
        return v
    }
    skip(n: number): number {
        this.position += n
        return this.position
    }

    clone(): FBytePakArchive {
        const clone = new FBytePakArchive(this.data, this.fileName, this.offsetInPakFile, this.pakFileSize)
        clone.seek(this.pos)
        clone.pakInfo = this.pakInfo
        return clone
    }

    pakSize(): number {
        return this.pakFileSize
    }
    pakPos() {
        return this.offsetInPakFile
    }

    readBuffer(size: number) {
        const b = Buffer.from([])
        this.data.copy(b, 0, this.position, this.position + size)
        return b
    }
}