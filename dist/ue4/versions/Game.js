"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ue4Version = exports.Game = void 0;
const _ = __importStar(require("./Versions"));
/**
 * Game
 */
class Game {
    /**
     * GAME_UE4
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4(x) {
        return this.GAME_UE4_BASE + (x << 4);
    }
    /**
     * GAME_UE4_GET_MINOR
     * @param {number} x X
     * @public
     * @static
     */
    static GAME_UE4_GET_MINOR(x) {
        return (x - this.GAME_UE4_BASE) >> 4;
    }
    /**
     * GAME_UE4_GET_AR_VER
     * @param {number} game Game
     * @public
     * @static
     */
    static GAME_UE4_GET_AR_VER(game) {
        return this.ue4Versions[this.GAME_UE4_GET_MINOR(game)];
    }
}
exports.Game = Game;
/**
 * UE4 Versions
 * @type {Array<number>}
 * @public
 * @static
 */
Game.ue4Versions = [_.VER_UE4_0, _.VER_UE4_1, _.VER_UE4_2, _.VER_UE4_3, _.VER_UE4_4,
    _.VER_UE4_5, _.VER_UE4_6, _.VER_UE4_7, _.VER_UE4_8, _.VER_UE4_9,
    _.VER_UE4_10, _.VER_UE4_11, _.VER_UE4_12, _.VER_UE4_13, _.VER_UE4_14,
    _.VER_UE4_15, _.VER_UE4_16, _.VER_UE4_17, _.VER_UE4_18, _.VER_UE4_19,
    _.VER_UE4_20, _.VER_UE4_21, _.VER_UE4_22, _.VER_UE4_23, _.VER_UE4_24,
    _.VER_UE4_25, _.VER_UE4_26, _.VER_UE4_27
];
/**
 * UE4 Base
 * @type {number}
 * @public
 * @static
 */
Game.GAME_UE4_BASE = 0x1000000;
/**
 * Latest supported UE4 version
 * @type {number}
 * @public
 * @static
 */
Game.LATEST_SUPPORTED_UE4_VERSION = 27;
/**
 * Valorant
 * @type {number}
 * @public
 * @static
 */
Game.GAME_VALORANT = Game.GAME_UE4(22) + 1;
/**
 * Ue4Version
 */
class Ue4Version {
    /**
     * Creates an instance using game
     * @param {number} game Game
     * @constructor
     * @public
     */
    constructor(game) {
        this.game = game;
        this.version = Game.ue4Versions[Game.GAME_UE4_GET_MINOR(game)];
    }
}
exports.Ue4Version = Ue4Version;
/**
 * GAME_UE4_0
 * @type {Ue4Version}
 * @public
 */
Ue4Version.GAME_UE4_0 = new Ue4Version(Game.GAME_UE4(0));
/**
 * GAME_UE4_1
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_1 = new Ue4Version(Game.GAME_UE4(1));
/**
 * GAME_UE4_2
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_2 = new Ue4Version(Game.GAME_UE4(2));
/**
 * GAME_UE4_3
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_3 = new Ue4Version(Game.GAME_UE4(3));
/**
 * GAME_UE4_4
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_4 = new Ue4Version(Game.GAME_UE4(4));
/**
 * GAME_UE4_5
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_5 = new Ue4Version(Game.GAME_UE4(5));
/**
 * GAME_UE4_6
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_6 = new Ue4Version(Game.GAME_UE4(6));
/**
 * GAME_UE4_7
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_7 = new Ue4Version(Game.GAME_UE4(7));
/**
 * GAME_UE4_8
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_8 = new Ue4Version(Game.GAME_UE4(8));
/**
 * GAME_UE4_9
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_9 = new Ue4Version(Game.GAME_UE4(9));
/**
 * GAME_UE4_10
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_10 = new Ue4Version(Game.GAME_UE4(10));
/**
 * GAME_UE4_11
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_11 = new Ue4Version(Game.GAME_UE4(11));
/**
 * GAME_UE4_12
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_12 = new Ue4Version(Game.GAME_UE4(12));
/**
 * GAME_UE4_13
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_13 = new Ue4Version(Game.GAME_UE4(13));
/**
 * GAME_UE4_14
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_14 = new Ue4Version(Game.GAME_UE4(14));
/**
 * GAME_UE4_15
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_15 = new Ue4Version(Game.GAME_UE4(15));
/**
 * GAME_UE4_16
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_16 = new Ue4Version(Game.GAME_UE4(16));
/**
 * GAME_UE4_17
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_17 = new Ue4Version(Game.GAME_UE4(17));
/**
 * GAME_UE4_18
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_18 = new Ue4Version(Game.GAME_UE4(18));
/**
 * GAME_UE4_19
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_19 = new Ue4Version(Game.GAME_UE4(19));
/**
 * GAME_UE4_20
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_20 = new Ue4Version(Game.GAME_UE4(20));
/**
 * GAME_UE4_21
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_21 = new Ue4Version(Game.GAME_UE4(21));
/**
 * GAME_UE4_22
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_22 = new Ue4Version(Game.GAME_UE4(22));
/**
 * GAME_UE4_23
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_23 = new Ue4Version(Game.GAME_UE4(23));
/**
 * GAME_UE4_24
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_24 = new Ue4Version(Game.GAME_UE4(24));
/**
 * GAME_UE4_25
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_25 = new Ue4Version(Game.GAME_UE4(25));
/**
 * GAME_UE4_26
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_26 = new Ue4Version(Game.GAME_UE4(26));
/**
 * GAME_UE4_27
 * @type {Ue4Version}
 * @public
 * @static
 */
Ue4Version.GAME_UE4_27 = new Ue4Version(Game.GAME_UE4(27));
// bytes: 01.00.0N.NX : 01=UE4, 00=masked by GAME_ENGINE, NN=UE4 subversion, X=game (4 bits, 0=base engine)
// const val GAME_Borderlands3 = GAME_UE4(20) + 2
/**
 * Valorant
 * @type {Ue4Version}
 * @public
 */
Ue4Version.GAME_VALORANT = new Ue4Version(Game.GAME_VALORANT);
/**
 * Latest version
 * @type {Ue4Version}
 * @public
 */
Ue4Version.GAME_UE4_LATEST = new Ue4Version(Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION));
