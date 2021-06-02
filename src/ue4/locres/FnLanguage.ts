export function valueOfLanguageCode(lang: string): FnLanguage {
    const value = Object.values(FnLanguage).find(v => v === lang)
    return value || FnLanguage.UNKNOWN
}

export enum FnLanguage {
    AR = "ar",
    DE = "de",
    EN = "en",
    ES = "es",
    ES_419 = "es-419",
    FR = "fr",
    IT = "it",
    JA = "ja",
    KO = "ko",
    PL = "pl",
    PT_BR = "pt-BR",
    RU = "ru",
    TR = "tr",
    ZH_CN = "zh-CN",
    ZH_HANT = "zh-Hant",
    UNKNOWN = "unknown"
}