import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { IPropertyHolder } from "./objects/IPropertyHolder";

export abstract class Package extends IPropertyHolder {
    fileName: string
    provider: FileProvider = null
    game: number = this.provider.game || Ue4Version.GAME_UE4_LATEST

}