import * as _ from "./Versions"

/**
 * Game
 */
export class Game {
    /**
     * UE4 Versions
     * @type {Array<number>}
     * @public
     * @static
     */
    static ue4Versions = [_.VER_UE4_0, _.VER_UE4_1, _.VER_UE4_2, _.VER_UE4_3, _.VER_UE4_4,
        _.VER_UE4_5, _.VER_UE4_6, _.VER_UE4_7, _.VER_UE4_8, _.VER_UE4_9,
        _.VER_UE4_10, _.VER_UE4_11, _.VER_UE4_12, _.VER_UE4_13, _.VER_UE4_14,
        _.VER_UE4_15, _.VER_UE4_16, _.VER_UE4_17, _.VER_UE4_18, _.VER_UE4_19,
        _.VER_UE4_20, _.VER_UE4_21, _.VER_UE4_22, _.VER_UE4_23, _.VER_UE4_24,
        _.VER_UE4_25, _.VER_UE4_26, _.VER_UE4_27
    ]

    /**
     * UE4 Base
     * @type {number}
     * @public
     * @static
     */
    static GAME_UE4_BASE = 0x1000000

    /**
     * Latest supported UE4 version
     * @type {number}
     * @public
     * @static
     */
    static LATEST_SUPPORTED_UE4_VERSION = 27

    /**
     * SOD 2
     * @type {number}
     * @public
     * @static
     */
    static GAME_SOD2 = Game.GAME_UE4(13) + 1

    /**
     * Borderlands 3
     * @type {number}
     * @public
     * @static
     */
    static GAME_BORDERLANDS3 = Game.GAME_UE4(20) + 1

    /**
     * Valorant
     * @type {number}
     * @public
     * @static
     */
    static GAME_VALORANT = Game.GAME_UE4(22) + 1

    /**
     * GAME_UE4
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4(x: number) {
        return this.GAME_UE4_BASE + (x << 4)
    }

    /**
     * GAME_UE4_GET_MINOR
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4_GET_MINOR(x: number) {
        return (x - this.GAME_UE4_BASE) >> 4
    }

    /**
     * GAME_UE4_GET_AR_VER
     * @param {number} game Game
     * @public
     * @static
     */
    static GAME_UE4_GET_AR_VER(game: number) {
        return this.ue4Versions[this.GAME_UE4_GET_MINOR(game)]
    }

    static GAME_UE5_BASE = 0x2000000

    static GAME_UE5(x: number) {
        return this.GAME_UE5_BASE + (x << 4)
    }

    static GAME_UE5_GET_MINOR(x: number) {
        return (x - this.GAME_UE5_BASE) >> 4
    }

    static LATEST_SUPPORTED_UE5_VERSION = 0
}

/**
 * Ue4Version
 */
export class Ue4Version {
    /**
     * Version
     * @type {number}
     * @public
     */
    public version: number

    /**
     * Game
     * @type {number}
     * @public
     */
    public game: number

    /**
     * Creates an instance using game
     * @param {number} game Game
     * @constructor
     * @public
     */
    constructor(game: number) {
        this.game = game
        this.version = Game.ue4Versions[Game.GAME_UE4_GET_MINOR(game)]
    }

    /**
     * GAME_UE4_0
     * @type {Ue4Version}
     * @public
     */
    static GAME_UE4_0 = new Ue4Version(Game.GAME_UE4(0))

    /**
     * GAME_UE4_1
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_1 = new Ue4Version(Game.GAME_UE4(1))

    /**
     * GAME_UE4_2
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_2 = new Ue4Version(Game.GAME_UE4(2))

    /**
     * GAME_UE4_3
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_3 = new Ue4Version(Game.GAME_UE4(3))

    /**
     * GAME_UE4_4
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_4 = new Ue4Version(Game.GAME_UE4(4))

    /**
     * GAME_UE4_5
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_5 = new Ue4Version(Game.GAME_UE4(5))

    /**
     * GAME_UE4_6
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_6 = new Ue4Version(Game.GAME_UE4(6))

    /**
     * GAME_UE4_7
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_7 = new Ue4Version(Game.GAME_UE4(7))

    /**
     * GAME_UE4_8
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_8 = new Ue4Version(Game.GAME_UE4(8))

    /**
     * GAME_UE4_9
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_9 = new Ue4Version(Game.GAME_UE4(9))

    /**
     * GAME_UE4_10
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_10 = new Ue4Version(Game.GAME_UE4(10))

    /**
     * GAME_UE4_11
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_11 = new Ue4Version(Game.GAME_UE4(11))

    /**
     * GAME_UE4_12
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_12 = new Ue4Version(Game.GAME_UE4(12))

    /**
     * GAME_UE4_13
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_13 = new Ue4Version(Game.GAME_UE4(13))

    /**
     * GAME_UE4_14
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_14 = new Ue4Version(Game.GAME_UE4(14))

    /**
     * GAME_UE4_15
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_15 = new Ue4Version(Game.GAME_UE4(15))

    /**
     * GAME_UE4_16
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_16 = new Ue4Version(Game.GAME_UE4(16))

    /**
     * GAME_UE4_17
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_17 = new Ue4Version(Game.GAME_UE4(17))

    /**
     * GAME_UE4_18
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_18 = new Ue4Version(Game.GAME_UE4(18))

    /**
     * GAME_UE4_19
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_19 = new Ue4Version(Game.GAME_UE4(19))

    /**
     * GAME_UE4_20
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_20 = new Ue4Version(Game.GAME_UE4(20))

    /**
     * GAME_UE4_21
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_21 = new Ue4Version(Game.GAME_UE4(21))

    /**
     * GAME_UE4_22
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_22 = new Ue4Version(Game.GAME_UE4(22))

    /**
     * GAME_UE4_23
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_23 = new Ue4Version(Game.GAME_UE4(23))

    /**
     * GAME_UE4_24
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_24 = new Ue4Version(Game.GAME_UE4(24))

    /**
     * GAME_UE4_25
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_25 = new Ue4Version(Game.GAME_UE4(25))

    /**
     * GAME_UE4_26
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_26 = new Ue4Version(Game.GAME_UE4(26))

    /**
     * GAME_UE4_27
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_27 = new Ue4Version(Game.GAME_UE4(27))

    /**
     * GAME_UE5_0
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE5_0 = new Ue4Version(Game.GAME_UE5(0))

    // bytes: 01.00.0N.NX : 01=UE4, 00=masked by GAME_ENGINE, NN=UE4 subversion, X=game (4 bits, 0=base engine)
    // const val GAME_Borderlands3 = GAME_UE4(20) + 2

    /**
     * SOD 2
     * @type {Ue4Version}
     * @public
     */
    static GAME_SOD2 = new Ue4Version(Game.GAME_SOD2)

    /**
     * Borderlands 3
     * @type {Ue4Version}
     * @public
     */
    static GAME_BORDERLANDS3 = new Ue4Version(Game.GAME_BORDERLANDS3)

    /**
     * Valorant
     * @type {Ue4Version}
     * @public
     */
    static GAME_VALORANT = new Ue4Version(Game.GAME_VALORANT)

    /**
     * Latest UE4 version
     * @type {Ue4Version}
     * @public
     */
    static GAME_UE4_LATEST = new Ue4Version(Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION))

    /**
     * Latest UE5 version
     * @type {Ue4Version}
     * @public
     */
    static GAME_UE5_LATEST = new Ue4Version(Game.GAME_UE5(Game.LATEST_SUPPORTED_UE5_VERSION))

    static getArVer(game: number): number {
        if (game < Game.GAME_UE4(1))
            return _.VER_UE4_0
        if (game < Game.GAME_UE4(2))
            return _.VER_UE4_1
        if (game < Game.GAME_UE4(3))
            return _.VER_UE4_2
        if (game < Game.GAME_UE4(4))
            return _.VER_UE4_3
        if (game < Game.GAME_UE4(5))
            return _.VER_UE4_4
        if (game < Game.GAME_UE4(6))
            return _.VER_UE4_5
        if (game < Game.GAME_UE4(7))
            return _.VER_UE4_6
        if (game < Game.GAME_UE4(8))
            return _.VER_UE4_7
        if (game < Game.GAME_UE4(9))
            return _.VER_UE4_8
        if (game < Game.GAME_UE4(10))
            return _.VER_UE4_9
        if (game < Game.GAME_UE4(11))
            return _.VER_UE4_10
        if (game < Game.GAME_UE4(12))
            return _.VER_UE4_11
        if (game < Game.GAME_UE4(13))
            return _.VER_UE4_12
        if (game < Game.GAME_UE4(14))
            return _.VER_UE4_13
        if (game < Game.GAME_UE4(15))
            return _.VER_UE4_14
        if (game < Game.GAME_UE4(16))
            return _.VER_UE4_15
        if (game < Game.GAME_UE4(17))
            return _.VER_UE4_16
        if (game < Game.GAME_UE4(18))
            return _.VER_UE4_17
        if (game < Game.GAME_UE4(19))
            return _.VER_UE4_18
        if (game < Game.GAME_UE4(20))
            return _.VER_UE4_19
        if (game < Game.GAME_UE4(21))
            return _.VER_UE4_20
        if (game < Game.GAME_UE4(22))
            return _.VER_UE4_21
        if (game < Game.GAME_UE4(23))
            return _.VER_UE4_22
        if (game < Game.GAME_UE4(24))
            return _.VER_UE4_23
        if (game < Game.GAME_UE4(25))
            return _.VER_UE4_24
        if (game < Game.GAME_UE4(26))
            return _.VER_UE4_25
        if (game < Game.GAME_UE4(27))
            return _.VER_UE4_26
        if (game < Game.GAME_UE5(0))
            return _.VER_UE4_27
        return _.VER_UE5_0
    }
}




