import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FNameEntry } from "../objects/uobject/FNameEntry";
import { Package } from "./Package";

export class PakPackage extends Package {
    protected packageMagic = 0x9E2A83C1
    uasset: Buffer
    uexp?: Buffer = null
    ubulk?: Buffer = null
    fileName: string
    provider?: FileProvider = null
    game: number = Ue4Version.GAME_UE4_LATEST

    constructor(uasset: Buffer, uexp: Buffer = null, ubulk: Buffer = null, name: string, provider: FileProvider = null, game: number = Ue4Version.GAME_UE4_LATEST) {
        super(name, provider, game)
        this.uasset = uasset
        this.uexp = uexp
        this.ubulk = ubulk
        this.fileName = name
        this.provider = provider
        this.game = game
    }

    info
    nameMap: FNameEntry[]
}