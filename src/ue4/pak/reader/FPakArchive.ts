import { FArchive } from "../../reader/FArchive";

export abstract class FPakArchive extends FArchive {
    fileName: string
    hasPakInfo: boolean
    pakInfo: any

    constructor(fileName: string) {
        super()
        this.fileName = fileName
    }

    public abstract clone(): FPakArchive

    abstract pakSize(): number
    get size() {
        return this.pakSize()
    }

    abstract pakPos(): number
    get pos(): number {
        return this.pakPos()
    }

    printError() {
        return `FPakArchive Info: pos ${this.pakPos()}, stopper ${this.pakSize()}`
    }

    readAndCreateReader(size: number) {
        // TODO FBytePakArchive
    }

    createReader() {
        // TODO FBytePakArchive
    }
}