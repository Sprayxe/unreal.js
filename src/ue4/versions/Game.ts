import * as _ from "./Versions"

export class Game {
    static ue4Versions = [_.VER_UE4_0, _.VER_UE4_1, _.VER_UE4_2, _.VER_UE4_3, _.VER_UE4_4,
        _.VER_UE4_5, _.VER_UE4_6, _.VER_UE4_7, _.VER_UE4_8, _.VER_UE4_9,
        _.VER_UE4_10, _.VER_UE4_11, _.VER_UE4_12, _.VER_UE4_13, _.VER_UE4_14,
        _.VER_UE4_15, _.VER_UE4_16, _.VER_UE4_17, _.VER_UE4_18, _.VER_UE4_19,
        _.VER_UE4_20, _.VER_UE4_21, _.VER_UE4_22, _.VER_UE4_23, _.VER_UE4_24,
        _.VER_UE4_25, _.VER_UE4_26, _.VER_UE4_27
    ]

    static GAME_UE4_BASE = 0x1000000

    static LATEST_SUPPORTED_UE4_VERSION = 27

    static GAME_VALORANT = Game.GAME_UE4(22) + 1

    static GAME_UE4(x: number) {
        return this.GAME_UE4_BASE + (x << 4)
    }

    static GAME_UE4_GET_MINOR(x: number) {
        return (x - this.GAME_UE4_BASE) >> 4
    }

    static GAME_UE4_GET_AR_VER(game: number) {
        return this.ue4Versions[this.GAME_UE4_GET_MINOR(game)]
    }
}

export class Ue4Version {
    public version: number
    public game: number

    constructor(game: number) {
        this.game = game
        this.version = Game.ue4Versions[Game.GAME_UE4_GET_MINOR(game)]
    }

    static GAME_UE4_0 = new Ue4Version(Game.GAME_UE4(0))
    static GAME_UE4_1 = new Ue4Version(Game.GAME_UE4(1))
    static GAME_UE4_2 = new Ue4Version(Game.GAME_UE4(2))
    static GAME_UE4_3 = new Ue4Version(Game.GAME_UE4(3))
    static GAME_UE4_4 = new Ue4Version(Game.GAME_UE4(4))
    static GAME_UE4_5 = new Ue4Version(Game.GAME_UE4(5))
    static GAME_UE4_6 = new Ue4Version(Game.GAME_UE4(6))
    static GAME_UE4_7 = new Ue4Version(Game.GAME_UE4(7))
    static GAME_UE4_8 = new Ue4Version(Game.GAME_UE4(8))
    static GAME_UE4_9 = new Ue4Version(Game.GAME_UE4(9))
    static GAME_UE4_10 = new Ue4Version(Game.GAME_UE4(10))
    static GAME_UE4_11 = new Ue4Version(Game.GAME_UE4(11))
    static GAME_UE4_12 = new Ue4Version(Game.GAME_UE4(12))
    static GAME_UE4_13 = new Ue4Version(Game.GAME_UE4(13))
    static GAME_UE4_14 = new Ue4Version(Game.GAME_UE4(14))
    static GAME_UE4_15 = new Ue4Version(Game.GAME_UE4(15))
    static GAME_UE4_16 = new Ue4Version(Game.GAME_UE4(16))
    static GAME_UE4_17 = new Ue4Version(Game.GAME_UE4(17))
    static GAME_UE4_18 = new Ue4Version(Game.GAME_UE4(18))
    static GAME_UE4_19 = new Ue4Version(Game.GAME_UE4(19))
    static GAME_UE4_20 = new Ue4Version(Game.GAME_UE4(20))
    static GAME_UE4_21 = new Ue4Version(Game.GAME_UE4(21))
    static GAME_UE4_22 = new Ue4Version(Game.GAME_UE4(22))
    static GAME_UE4_23 = new Ue4Version(Game.GAME_UE4(23))
    static GAME_UE4_24 = new Ue4Version(Game.GAME_UE4(24))
    static GAME_UE4_25 = new Ue4Version(Game.GAME_UE4(25))
    static GAME_UE4_26 = new Ue4Version(Game.GAME_UE4(26))
    static GAME_UE4_27 = new Ue4Version(Game.GAME_UE4(27))

    // bytes: 01.00.0N.NX : 01=UE4, 00=masked by GAME_ENGINE, NN=UE4 subversion, X=game (4 bits, 0=base engine)
    // const val GAME_Borderlands3 = GAME_UE4(20) + 2
    static GAME_VALORANT = new Ue4Version(Game.GAME_VALORANT)

    static GAME_UE4_LATEST = new Ue4Version(Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION))
}




