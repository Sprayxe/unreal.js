/**
 * Game
 */
export declare class Game {
    /**
     * UE4 Versions
     * @type {Array<number>}
     * @public
     * @static
     */
    static ue4Versions: number[];
    /**
     * UE4 Base
     * @type {number}
     * @public
     * @static
     */
    static GAME_UE4_BASE: number;
    /**
     * Latest supported UE4 version
     * @type {number}
     * @public
     * @static
     */
    static LATEST_SUPPORTED_UE4_VERSION: number;
    /**
     * Valorant
     * @type {number}
     * @public
     * @static
     */
    static GAME_VALORANT: number;
    /**
     * GAME_UE4
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4(x: number): number;
    /**
     * GAME_UE4_GET_MINOR
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4_GET_MINOR(x: number): number;
    /**
     * GAME_UE4_GET_AR_VER
     * @param {number} game Game
     * @public
     * @static
     */
    static GAME_UE4_GET_AR_VER(game: number): number;
}
/**
 * Ue4Version
 */
export declare class Ue4Version {
    /**
     * Version
     * @type {number}
     * @public
     */
    version: number;
    /**
     * Game
     * @type {number}
     * @public
     */
    game: number;
    /**
     * Creates an instance using game
     * @param {number} game Game
     * @constructor
     * @public
     */
    constructor(game: number);
    /**
     * GAME_UE4_0
     * @type {Ue4Version}
     * @public
     */
    static GAME_UE4_0: Ue4Version;
    /**
     * GAME_UE4_1
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_1: Ue4Version;
    /**
     * GAME_UE4_2
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_2: Ue4Version;
    /**
     * GAME_UE4_3
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_3: Ue4Version;
    /**
     * GAME_UE4_4
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_4: Ue4Version;
    /**
     * GAME_UE4_5
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_5: Ue4Version;
    /**
     * GAME_UE4_6
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_6: Ue4Version;
    /**
     * GAME_UE4_7
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_7: Ue4Version;
    /**
     * GAME_UE4_8
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_8: Ue4Version;
    /**
     * GAME_UE4_9
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_9: Ue4Version;
    /**
     * GAME_UE4_10
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_10: Ue4Version;
    /**
     * GAME_UE4_11
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_11: Ue4Version;
    /**
     * GAME_UE4_12
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_12: Ue4Version;
    /**
     * GAME_UE4_13
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_13: Ue4Version;
    /**
     * GAME_UE4_14
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_14: Ue4Version;
    /**
     * GAME_UE4_15
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_15: Ue4Version;
    /**
     * GAME_UE4_16
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_16: Ue4Version;
    /**
     * GAME_UE4_17
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_17: Ue4Version;
    /**
     * GAME_UE4_18
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_18: Ue4Version;
    /**
     * GAME_UE4_19
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_19: Ue4Version;
    /**
     * GAME_UE4_20
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_20: Ue4Version;
    /**
     * GAME_UE4_21
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_21: Ue4Version;
    /**
     * GAME_UE4_22
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_22: Ue4Version;
    /**
     * GAME_UE4_23
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_23: Ue4Version;
    /**
     * GAME_UE4_24
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_24: Ue4Version;
    /**
     * GAME_UE4_25
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_25: Ue4Version;
    /**
     * GAME_UE4_26
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_26: Ue4Version;
    /**
     * GAME_UE4_27
     * @type {Ue4Version}
     * @public
     * @static
     */
    static GAME_UE4_27: Ue4Version;
    /**
     * Valorant
     * @type {Ue4Version}
     * @public
     */
    static GAME_VALORANT: Ue4Version;
    /**
     * Latest version
     * @type {Ue4Version}
     * @public
     */
    static GAME_UE4_LATEST: Ue4Version;
}
