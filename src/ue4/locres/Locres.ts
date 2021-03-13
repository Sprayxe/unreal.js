import { FnLanguage } from "./FnLanguage";
import { FByteArchive } from "../reader/FByteArchive";
import { FTextLocalizationResource } from "../objects/core/i18n/FTextLocalizationResource";

export class Locres {
    locres: Buffer
    fileName: string
    language: string
    texts: FTextLocalizationResource

    constructor(file: Buffer, fileName: string = "UNKNOWN-LOCRES-FILE") {
        this.locres = file
        this.fileName = fileName
        this.language = FnLanguage.UNKNOWN

        const locresAr = new FByteArchive(this.locres)
        this.texts = new FTextLocalizationResource(locresAr)
    }

    mergeInto(target: Locres) {
        this.texts.stringData.forEach((namespace, content) => {
            const targetNamespace = target.texts
        })
    }
}