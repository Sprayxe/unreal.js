import { FileProvider } from "./FileProvider";
import { GameFile } from "../ue4/pak/GameFile";
import { PakPackage } from "../ue4/assets/PakPackage";
import { Package } from "../ue4/assets/Package";
import { FPackageId } from "../ue4/objects/uobject/FPackageId";
import { FName } from "../ue4/objects/uobject/FName";
import { Locres } from "../ue4/locres/Locres";

export abstract class AbstractFileProvider extends FileProvider {
    protected globalDataLoaded = false

    loadGameFile(filePath: string)
    loadGameFile(file: GameFile)
    loadGameFile(packageId: FPackageId)
    loadGameFile(x: any): Package {
        try {
            if (x instanceof GameFile) {
                if (x.ioPackageId != null)
                    return this.loadGameFile(x.ioPackageId)
                if (!x.isUE4Package() || !x.hasUexp())
                    throw new Error("The provided file is not a package file")
                const uasset = this.saveGameFile(x)
                const uexp = this.saveGameFile(x.uexp)
                const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null
                return new PakPackage(uasset, uexp, ubulk, x.path, this, this.game)
            } else if (typeof x === "string") {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(path)
                if (gameFile)
                    return this.loadGameFile(gameFile)
                // try load from IoStore
                if (this.globalDataLoaded) {
                    const name = this.compactFilePath(x)
                    const packageId = FPackageId.fromName(FName.dummy(name, 0))
                    try {
                        const ioFile = this.loadGameFile(packageId)
                        if (ioFile)
                            return ioFile
                    } catch (e) {
                        console.error(`Failed to load package ${path}`)
                    }
                }
                // try load from file system
                if (!path.endsWith(".uasset") && !path.endsWith(".umap"))
                    return null
                const uasset = this.saveGameFile(path)
                if (!uasset)
                    return null
                const uexp = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".uexp")
                if (!uexp)
                    return null
                const ubulk = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".ubulk")
                return new PakPackage(uasset, uexp, ubulk, path, this, this.game)
            }
        } catch (e) {
            console.error(`Failed to load package ${x.path}`)
            console.error(e)
        }
    }

    findGameFile(filePath: string): GameFile {
        const path = this.fixPath(filePath)
        return this.files.get(path)
    }

    loadLocres(filePath: string): Locres
    loadLocres(file: GameFile): Locres
    loadLocres(x?: any): Locres {
        try {
            if (x instanceof GameFile) {
                if (!x.isLocres())
                    return null
                const locres = this.saveGameFile(x)
                return new Locres(locres, x.path, this.getLocresLanguageByPath(x.path))
            } else {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(path)
                if (!gameFile)
                    return this.loadLocres(gameFile)
                if (!path.endsWith(".locres"))
                    return null
                const locres = this.saveGameFile(path)
                if (!locres)
                    return null
                return new Locres(locres, path, this.getLocresLanguageByPath(x))
            }
        } catch (e) {
            console.error(`Failed to load locres ${x.path}`)
            console.error(e)
        }
    }

    
}