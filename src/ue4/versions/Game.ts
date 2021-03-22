import * as _ from "./Versions"
export const ue4Versions = [_.VER_UE4_0, _.VER_UE4_1, _.VER_UE4_2, _.VER_UE4_3, _.VER_UE4_4,
    _.VER_UE4_5, _.VER_UE4_6, _.VER_UE4_7, _.VER_UE4_8, _.VER_UE4_9,
    _.VER_UE4_10, _.VER_UE4_11, _.VER_UE4_12, _.VER_UE4_13, _.VER_UE4_14,
    _.VER_UE4_15, _.VER_UE4_16, _.VER_UE4_17, _.VER_UE4_18, _.VER_UE4_19,
    _.VER_UE4_20, _.VER_UE4_21, _.VER_UE4_22, _.VER_UE4_23, _.VER_UE4_24,
    _.VER_UE4_25, _.VER_UE4_26
]
export const LATEST_SUPPORTED_UE4_VERSION = 26

export const GAME_UE4_BASE: number = 0x1000000

export function GAME_UE4(x: number) {
    return GAME_UE4_BASE + (x << 4)
}
export function GAME_UE4_GET_MINOR(x: number) {
    return (x - GAME_UE4_BASE) >> 4
}
export function GAME_UE4_GET_AR_VER(game: number) {
    return ue4Versions[GAME_UE4_GET_MINOR(game)]
}

export class Ue4Version {
    version: number
    game: number

    constructor(game: number) {
        this.game = game
        this.version = ue4Versions[GAME_UE4_GET_MINOR(game)]
    }

    static GAME_UE4_0 = GAME_UE4(0)
    static GAME_UE4_1 = GAME_UE4(1)
    static GAME_UE4_2 = GAME_UE4(2)
    static GAME_UE4_3 = GAME_UE4(3)
    static GAME_UE4_4 = GAME_UE4(4)
    static GAME_UE4_5 = GAME_UE4(5)
    static GAME_UE4_6 = GAME_UE4(6)
    static GAME_UE4_7 = GAME_UE4(7)
    static GAME_UE4_8 = GAME_UE4(8)
    static GAME_UE4_9 = GAME_UE4(9)
    static GAME_UE4_10 = GAME_UE4(10)
    static GAME_UE4_11 = GAME_UE4(11)
    static GAME_UE4_12 = GAME_UE4(12)
    static GAME_UE4_13 = GAME_UE4(13)
    static GAME_UE4_14 = GAME_UE4(14)
    static GAME_UE4_15 = GAME_UE4(15)
    static GAME_UE4_16 = GAME_UE4(16)
    static GAME_UE4_17 = GAME_UE4(17)
    static GAME_UE4_18 = GAME_UE4(18)
    static GAME_UE4_19 = GAME_UE4(19)
    static GAME_UE4_20 = GAME_UE4(20)
    static GAME_UE4_21 = GAME_UE4(21)
    static GAME_UE4_22 = GAME_UE4(22)
    static GAME_UE4_23 = GAME_UE4(23)
    static GAME_UE4_24 = GAME_UE4(24)
    static GAME_UE4_25 = GAME_UE4(25)
    static GAME_UE4_26 = GAME_UE4(26)

    static GAME_UE4_LATEST = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
}




