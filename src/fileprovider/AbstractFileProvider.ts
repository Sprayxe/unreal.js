/*import { FileProvider } from "./FileProvider";
import { GameFile } from "../ue4/pak/GameFile";
import { PakPackage } from "../ue4/assets/PakPackage";
import { Package } from "../ue4/assets/Package";
import { FPackageId } from "../ue4/objects/uobject/FPackageId";
import { FName } from "../ue4/objects/uobject/FName";
import { Locres } from "../ue4/locres/Locres";
import { AssetRegistry } from "../ue4/registry/AssetRegistry";
import { IoPackage } from "../ue4/assets/IoPackage";
import { UnrealMap } from "../util/UnrealMap";

abstract class AbstractFileProvider extends FileProvider {
    protected globalDataLoaded = false

    loadGameFile(filePath: string): Package
    loadGameFile(file: GameFile): Package
    loadGameFile(packageId: FPackageId): IoPackage
    loadGameFile(x: any) {
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
            console.error(`Failed to load package ${typeof x === "string" ? x : x.path}`)
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
            console.error(`Failed to load locres ${x instanceof GameFile ? x.path : x}`)
            console.error(e)
        }
    }

    loadAssetRegistry(file: GameFile)
    loadAssetRegistry(filePath: string)
    loadAssetRegistry(x?: any): AssetRegistry {
        try {
            if (x instanceof GameFile) {
                if (!x.isAssetRegistry())
                    return null
                const locres = this.saveGameFile(x)
                return new AssetRegistry(locres, x.path)
            } else {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(x)
                if (gameFile)
                    return this.loadAssetRegistry(gameFile)
                if (!path.endsWith(".bin"))
                    return null
                const locres = this.saveGameFile(path)
                return locres ? new AssetRegistry(locres, path) : null
            }
        } catch (e) {
            console.error(`Failed to load asset registry ${x instanceof GameFile ? x.path : x}`)
        }
    }

    savePackage(filePath: string): UnrealMap<string, Buffer>
    savePackage(file: GameFile): UnrealMap<string, Buffer>
    savePackage(x?: any): UnrealMap<string, Buffer> {
        if (x instanceof GameFile) {
            const map = new UnrealMap<string, Buffer>()
            try {
                if (!x.isUE4Package() || !x.hasUexp()) {
                    const data = this.saveGameFile(x)
                    map.set(x.path, data)
                } else {
                    const uasset = this.saveGameFile(x)
                    map.set(x.path, uasset)
                    const uexp = this.saveGameFile(x.uexp)
                    map.set(x.uexp.path, uasset)
                    const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null
                    if (ubulk)
                        map.set(x.ubulk.path, ubulk)
                }
            } catch (e) {
                console.error(e)
            }
            return map
        } else {
            const path = this.fixPath(x)
            const gameFile = this.findGameFile(path)
            if (gameFile)
                return this.savePackage(gameFile)
            const map = new UnrealMap<string, Buffer>()
            try {
                if (path.endsWith(".uasset") || path.endsWith(".umap")) {
                    const uasset = this.saveGameFile(path)
                    if (!uasset)
                        return map
                    map.set(path, uasset)
                    const uexpPath = path.substring(0, path.lastIndexOf(".")) + ".uexp"
                    const uexp = this.saveGameFile(uexpPath)
                    if (!uexp)
                        return null
                    map.set(uexpPath, uexp)
                    const ubulkPath = path.substring(0, path.lastIndexOf(".")) + ".ubulk"
                    const ubulk = this.saveGameFile(ubulkPath)
                    map.set(ubulkPath, ubulk)
                } else {
                    const data = this.saveGameFile(path)
                    if (!data)
                        return map
                    map.set(path, data)
                }
            } catch (e) {
                console.error(e)
            }
            return map
        }
    }
}*/