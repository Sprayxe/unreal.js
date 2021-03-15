import { FileProvider } from "./FileProvider";
import { GameFile } from "../ue4/pak/GameFile";
import { PakPackage } from "../ue4/assets/PakPackage";
import { Package } from "../ue4/assets/Package";

export abstract class AbstractFileProvider extends FileProvider {
    protected globalDataLoaded = false

    loadGameFile(file: GameFile): Package
    loadGameFile(file: GameFile): Package {
        if (file.ioPackageId != null)
            return this.loadGameFile(file.ioPackageId)
        if (!file.isUE4Package() || !file.hasUexp())
            throw new Error("The provided file is not a package file")
        const uasset = this.saveGameFile(file)
        const uexp = this.saveGameFile(file.uexp)
        const ubulk = file.hasUbulk() ? this.saveGameFile(file.ubulk) : null
        return new PakPackage(uasset, uexp, ubulk, file.path, this, this.game)
    }
}