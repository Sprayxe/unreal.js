import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { UObject } from "./exports/UObject";
import { UStruct } from "./exports/UStruct";
import { UScriptStruct } from "./exports/UScriptStruct";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";

export abstract class Package extends UObject {
    fileName: string
    provider?: FileProvider = null
    game: Ue4Version = this.provider?.game || Ue4Version.GAME_UE4_LATEST

    protected constructor(fileName: string, provider: FileProvider, game: Ue4Version) {
        super()
        this.fileName = fileName
        this.provider = provider
        this.game = game
    }

    abstract exportsLazy: Lazy<UObject>[]
    get exports(): UObject[] {
        return this.exportsLazy.map(it => it.value)
    }
    packageFlags = 0

    protected static constructExport(struct: UStruct): UObject {
        let current = struct
        while (current) {
            const c = (current as UScriptStruct)?.structClass
            if (c) {
                const nc = new c.constructor() as UObject
                nc.clazz = struct
                return nc
            }
            current = current.superStruct?.value
        }
        const u = new UObject()
        u.clazz = struct
        return u
    }

    /**
     * @param type The class object which is either UObject or extends it
     * @returns the first export of the given type
     * @throws {TypeError} if there is no export of the given type
     * @example getExportOfType(CharacterAbilityUIData)
     */
    getExportOfType(type: Function) {
        const obj = this.getExportsOfType(type)[0]
        if (obj)
            return obj
        throw new TypeError(`Could not find export of type '${type.name}'`)
    }

    /**
     * @param type The class object which is either UObject or extends it
     * @returns the first export of the given type or null if there is no
     * @example getExportOfType(CharacterAbilityUIData)
     */
    getExportOfTypeOrNull(type: Function) {
        return this.getExportsOfType(type)[0] || null
    }

    /**
     * @param type The class object which is either UObject or extends it
     * @returns the all exports of the given type
     * @example getExportOfType(CharacterAbilityUIData)
     */
    getExportsOfType(type: Function) {
        return this.exports.filter(e => e instanceof type)
    }

    abstract findObject<T>(index: FPackageIndex): T
    loadObject<T>(index: FPackageIndex) {
        return this.findObject<T>(index)
    }

    abstract findObjectByName(objectName: string, className?: string): UObject
    abstract toJson(locres?: Locres): IJson[]
}

export interface IJson {
    type: string,
    name: string,
    properties: any
}
