/// <reference types="node" />
/// <reference types="ref-napi" />
import { FnLanguage } from "./FnLanguage";
import { FTextLocalizationResource } from "../objects/core/i18n/FTextLocalizationResource";
/**
 * UE4 Text Localization (.locres)
 */
export declare class Locres {
    /**
     * Raw data of the locres
     * @type {Buffer}
     * @public
     */
    locres: Buffer;
    /**
     * Name of the locres file
     * @type {string}
     * @public
     */
    fileName: string;
    /**
     * Language of locres file
     * @type {FnLanguage}
     * @public
     */
    language: FnLanguage;
    /**
     * String data of the locres file
     * @type {FTextLocalizationResource}
     * @public
     */
    texts: FTextLocalizationResource;
    /**
     * Creates an instance
     * @param {Buffer} file Raw buffer of locres file
     * @param {string} fileName Name of locres file
     * @param {FnLanguage} language Language of locres file
     * @constructor
     * @public
     */
    constructor(file: Buffer, fileName?: string, language?: FnLanguage);
    /**
     * Merges locres data of this file into another
     * @param {Locres} target Locres file to merge into
     * @returns {void}
     * @public
     */
    mergeInto(target: Locres): void;
    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson(): {};
}
