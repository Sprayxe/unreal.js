"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnLanguage = exports.valueOfLanguageCode = void 0;
/**
 * Gets value of language code
 * @param {string} lang Language code
 * @returns {FnLanguage} Instance
 * @export
 */
function valueOfLanguageCode(lang) {
    const value = Object.values(FnLanguage).find(v => v === lang);
    return value || FnLanguage.UNKNOWN;
}
exports.valueOfLanguageCode = valueOfLanguageCode;
/**
 * FnLanguage
 * @enum
 */
var FnLanguage;
(function (FnLanguage) {
    FnLanguage["AR"] = "ar";
    FnLanguage["DE"] = "de";
    FnLanguage["EN"] = "en";
    FnLanguage["ES"] = "es";
    FnLanguage["ES_419"] = "es-419";
    FnLanguage["FR"] = "fr";
    FnLanguage["IT"] = "it";
    FnLanguage["JA"] = "ja";
    FnLanguage["KO"] = "ko";
    FnLanguage["PL"] = "pl";
    FnLanguage["PT_BR"] = "pt-BR";
    FnLanguage["RU"] = "ru";
    FnLanguage["TR"] = "tr";
    FnLanguage["ZH_CN"] = "zh-CN";
    FnLanguage["ZH_HANT"] = "zh-Hant";
    FnLanguage["UNKNOWN"] = "unknown";
})(FnLanguage = exports.FnLanguage || (exports.FnLanguage = {}));
