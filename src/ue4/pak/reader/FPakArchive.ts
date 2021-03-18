import { FArchive } from "../../reader/FArchive";
import { FBytePakArchive } from "./FBytePakArchive";
import { GAME_UE4_GET_AR_VER } from "../../versions/Game";

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

    abstract skip(n: number): number
    abstract pakPos(): number
    abstract seek(pos: number): number
    get pos(): number {
        return this.pakPos()
    }

    printError() {
        return `FPakArchive Info: pos ${this.position}, stopper ${this.pakSize()}`
    }

    readAndCreateReader(size: number) {
        if (this instanceof FBytePakArchive)
            throw new Error("This is already a temp reader")
        const readerPos = this.pakPos()
        return new FBytePakArchive(this.read(size), this.fileName, readerPos, this.pakSize())
    }

    createReader(data: Buffer, offset: number) {
        const r = new FBytePakArchive(data, this.fileName, offset, this.pakSize())
        r.game = this.game
        r.ver = GAME_UE4_GET_AR_VER(this.game)
        return r
    }
}