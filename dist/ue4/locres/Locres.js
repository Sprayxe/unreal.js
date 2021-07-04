"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locres = void 0;
const FnLanguage_1 = require("./FnLanguage");
const FByteArchive_1 = require("../reader/FByteArchive");
const FTextLocalizationResource_1 = require("../objects/core/i18n/FTextLocalizationResource");
const collection_1 = __importDefault(require("@discordjs/collection"));
/**
 * UE4 Text Localization (.locres)
 */
class Locres {
    /**
     * Creates an instance
     * @param {Buffer} file Raw buffer of locres file
     * @param {string} fileName Name of locres file
     * @param {FnLanguage} language Language of locres file
     * @constructor
     * @public
     */
    constructor(file, fileName = "UNKNOWN-LOCRES-FILE", language = FnLanguage_1.FnLanguage.UNKNOWN) {
        this.locres = file;
        this.fileName = fileName;
        this.language = language;
        const locresAr = new FByteArchive_1.FByteArchive(this.locres);
        this.texts = new FTextLocalizationResource_1.FTextLocalizationResource(locresAr);
    }
    /**
     * Merges locres data of this file into another
     * @param {Locres} target Locres file to merge into
     * @returns {void}
     * @public
     */
    mergeInto(target) {
        this.texts.stringData.forEach((content, namespace) => {
            let targetNamespace = target.texts.stringData.get(namespace);
            if (!targetNamespace) {
                const newNameSpace = new collection_1.default();
                target.texts.stringData.set(namespace, newNameSpace);
                targetNamespace = newNameSpace;
            }
            content.forEach((v, k) => {
                if (!targetNamespace.has(k))
                    targetNamespace.set(k, v);
            });
        });
    }
    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson() {
        const obj = {};
        this.texts.stringData.forEach((v, k) => {
            const obj2 = {};
            v.forEach((v2, k2) => obj2[k2] = v2);
            obj[k] = obj2;
        });
        return obj;
    }
}
exports.Locres = Locres;
