import { FArchive } from "../../reader/FArchive";
import { GAME_UE4_GET_AR_VER } from "../../versions/Game";
import { File } from "../../../util/File";

export abstract class FPakArchive extends FArchive {
    fileName: string
    hasPakInfo: boolean
    pakInfo: any

    constructor(file: File) {
        super(file.content)
        this.fileName = file.name
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

    readAndCreateReader(size: number, clazz: any) {
        const readerPos = this.pakPos()
        return new clazz(this.read(size), this.fileName, readerPos, this.pakSize())
    }

    createReader(data: Buffer, offset: number, clazz: any) {
        const r = new clazz(data, this.fileName, offset, this.pakSize())
        r.game = this.game
        r.ver = GAME_UE4_GET_AR_VER(this.game)
        return r
    }
}