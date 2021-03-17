import { FPakArchive } from "./reader/FPakArchive";
import { GAME_UE4, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";

export class PakFileReader {
    Ar: FPakArchive
    keepIndexData: boolean
    file

    constructor(Ar: FPakArchive, keepIndexData: boolean = false, file: string | Buffer, game: number = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)) {

    }
}