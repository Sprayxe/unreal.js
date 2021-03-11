import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";

export class PakPackage {
    protected packageMagic = 0x9E2A83C1
    uasset: Buffer
    uexp?: Buffer = null
    ubulk?: Buffer = null
    fileName: string
    provider?: FileProvider = null
    game: number = Ue4Version.GAME_UE4_LATEST
}