import { FArchive } from "../../reader/FArchive";

export abstract class FPakArchive extends FArchive {
    fileName: string
    hasPakInfo: boolean
    protected position = 0
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

    get pos(): number {
        return this.position
    }
    set pos(v: number) {
        this.position = v
    }

    printError() {
        return `FPakArchive Info: pos ${this.position}, stopper ${this.pakSize()}`
    }

    readAndCreateReader(size: number) {
        // TODO FBytePakArchive
    }

    createReader() {
        // TODO FBytePakArchive
    }
}