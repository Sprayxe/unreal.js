export class ETextHistoryType {
    value: number

    constructor(value: number) {
        this.value = value
    }

    private None = -1
    static None = -1

    private Base = 0
    static Base = 0

    private NamedFormat = 1
    static NamedFormat = 1

    private OrderedFormat = 2
    static OrderedFormat = 2

    private ArgumentFormat = 3
    static ArgumentFormat = 3

    private AsNumber = 4
    static AsNumber = 4

    private AsPercent = 5
    static AsPercent = 5

    private AsCurrency = 6
    static AsCurrency = 6

    private AsDate = 7
    static AsDate = 7

    private AsTime = 8
    static AsTime = 8

    private AsDateTime = 9
    static AsDateTime = 9

    private Transform = 10
    static Transform = 10

    private StringTableEntry = 11
    static StringTableEntry = 11

    private TextGenerator = 12
    static TextGenerator = 12

    valueOfByte(byte: number): ETextHistoryType {
        const keys = Object.keys(this)
        const value = this[keys.find(k => this[k] === byte)]
        if (!value)
            console.warn(`Unsupported ETextHistoryType ${byte}, using ETextHistoryType::None as fallback`)
        return value || this.None
    }
}