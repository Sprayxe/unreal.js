import { FileProvider } from "./FileProvider";
import { GameFile } from "../ue4/pak/GameFile";

export abstract class AbstractFileProvider extends FileProvider {
    protected globalDataLoaded = false

    async loadGameFile(file: GameFile): Promise<any>
    async loadGameFile(file: GameFile): Promise<any> {
        if (file.ioPackageId != null)
            return await this.loadGameFile(file.ioPackageId)
        if (!file.isUE4Package() || !file.hasUexp())
            throw new Error("The provided file is not a package file")
        const uasset = await this.saveGameFile(file)
        const uexp = await this.saveGameFile(file.uexp)
        const ubulk = file.hasUbulk() ? await this.saveGameFile(file.ubulk) : null
        return
    }
}