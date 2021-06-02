import { FnLanguage } from "./FnLanguage";
import { FByteArchive } from "../reader/FByteArchive";
import { FTextLocalizationResource } from "../objects/core/i18n/FTextLocalizationResource";
import { UnrealMap } from "../../util/UnrealMap";

export class Locres {
    locres: Buffer
    fileName: string
    language: FnLanguage
    texts: FTextLocalizationResource

    constructor(file: Buffer, fileName: string = "UNKNOWN-LOCRES-FILE", language: FnLanguage = FnLanguage.UNKNOWN) {
        this.locres = file
        this.fileName = fileName
        this.language = language
        const locresAr = new FByteArchive(this.locres)
        this.texts = new FTextLocalizationResource(locresAr)
    }

    mergeInto(target: Locres) {
        this.texts.stringData.forEach((content, namespace) => {
            let targetNamespace = target.texts.stringData.get(namespace)
            if (targetNamespace) {
                const newNameSpace = new UnrealMap<string, string>()
                target.texts.stringData.set(namespace, newNameSpace)
                targetNamespace = newNameSpace
            }
            content.forEach((v, k) => {
                if (!targetNamespace.has(k))
                    targetNamespace.set(k, v)
            })
        })
    }

    toJson() {
        const obj = {}
        this.texts.stringData.forEach((v, k) => {
            const obj2 = {}
            v.forEach((v2, k2) => obj2[k2] = v2)
            obj[k] = obj2
        })
        return obj
    }
}