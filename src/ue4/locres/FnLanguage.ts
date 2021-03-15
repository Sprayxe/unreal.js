export class FnLanguage {
    languageCode: string

    constructor(languageCode: string) {
        this.languageCode = languageCode
    }

    AR = "ar"
    static AR = "ar"

    DE = "de"
    static DE = "de"

    EN = "en"
    static EN = "en"

    ES = "es"
    static ES = "es"

    ES_419 = "es-419"
    static ES_419 = "es-419"

    FR = "fr"
    static FR = "fr"

    IT = "it"
    static IT = "it"

    JA = "ja"
    static JA = "ja"

    KO = "ko"
    static KO = "ko"

    PL = "pl"
    static PL = "pl"

    PT_BR = "pt-BR"
    static PT_BR = "pt-BR"

    RU = "ru"
    static RU = "ru"

    TR = "tr"
    static TR = "tr"

    ZH_CN = "zh-CN"
    static ZH_CN = "zh-CN"

    ZH_HANT = "zh-Hant"
    static ZH_HANT = "zh-Hant"

    UNKNOWN = "unknown"
    static UNKNOWN = "unknown"

    static valueOfLanguageCode(lang: string) {
        const keys = Object.keys(this)
        const value = this[keys.find(k => this[k] === lang)]
        return value || this.UNKNOWN
    }
}