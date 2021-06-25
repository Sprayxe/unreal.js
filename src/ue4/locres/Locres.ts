import { FnLanguage } from "./FnLanguage";
import { FByteArchive } from "../reader/FByteArchive";
import { FTextLocalizationResource } from "../objects/core/i18n/FTextLocalizationResource";
import { UnrealMap } from "../../util/UnrealMap";

/**
 * UE4 Text Localization (.locres)
 */
export class Locres {
    /**
     * Raw data of the locres
     * @type {Buffer}
     * @public
     */
    locres: Buffer

    /**
     * Name of the locres file
     * @type {string}
     * @public
     */
    fileName: string

    /**
     * Language of locres file
     * @type {FnLanguage}
     * @public
     */
    language: FnLanguage

    /**
     * String data of the locres file
     * @type {FTextLocalizationResource}
     * @public
     */
    texts: FTextLocalizationResource

    /**
     * Creates an instance
     * @param {Buffer} file Raw buffer of locres file
     * @param {string} fileName Name of locres file
     * @param {FnLanguage} language Language of locres file
     * @constructor
     * @public
     */
    constructor(file: Buffer, fileName: string = "UNKNOWN-LOCRES-FILE", language: FnLanguage = FnLanguage.UNKNOWN) {
        this.locres = file
        this.fileName = fileName
        this.language = language
        const locresAr = new FByteArchive(this.locres)
        this.texts = new FTextLocalizationResource(locresAr)
    }

    /**
     * Merges locres data of this file into another
     * @param {Locres} target Locres file to merge into
     * @returns {void}
     * @public
     */
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

    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
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