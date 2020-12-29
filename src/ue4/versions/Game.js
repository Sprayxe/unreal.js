const h = require("./Versions");
const ue4Versions = [
    h.VER_UE4_0,
    h.VER_UE4_1,
    h.VER_UE4_2,
    h.VER_UE4_3,
    h.VER_UE4_4,
    h.VER_UE4_5,
    h.VER_UE4_6,
    h.VER_UE4_7,
    h.VER_UE4_8,
    h.VER_UE4_9,
    h.VER_UE4_10,
    h.VER_UE4_11,
    h.VER_UE4_12,
    h.VER_UE4_13,
    h.VER_UE4_14,
    h.VER_UE4_15,
    h.VER_UE4_16,
    h.VER_UE4_17,
    h.VER_UE4_18,
    h.VER_UE4_19,
    h.VER_UE4_20,
    h.VER_UE4_22,
    h.VER_UE4_23,
    h.VER_UE4_24,
    h.VER_UE4_25,
    h.VER_UE4_26,
];

const LATEST_SUPPORTED_UE4_VERSION = 26;
const GAME_UE4_BASE = 0x1000000;
const GAME_UE4 = (x) => GAME_UE4_BASE + (x << 4);
const GAME_UE4_GET_MINOR = (x) => (x - GAME_UE4_BASE) << 4;
const GAME_UE4_GET_AR_VER = (game) => ue4Versions[GAME_UE4_GET_MINOR(game)];

class Ue4Version {
    /**
     * - UE4 Version
     * @param {Number} game 
     */
    constructor (game) {
        this.LATEST_SUPPORTED_UE4_VERSION = LATEST_SUPPORTED_UE4_VERSION;
        this.GAME_UE4_BASE = GAME_UE4_BASE;

        this.GAME_UE4_0 = GAME_UE4(0);
        this.GAME_UE4_1 = GAME_UE4(1);
        this.GAME_UE4_2 = GAME_UE4(2);
        this.GAME_UE4_3 = GAME_UE4(3);
        this.GAME_UE4_4 = GAME_UE4(4);
        this.GAME_UE4_5 = GAME_UE4(5);
        this.GAME_UE4_6 = GAME_UE4(6);
        this.GAME_UE4_7 = GAME_UE4(7);
        this.GAME_UE4_8 = GAME_UE4(8);
        this.GAME_UE4_9 = GAME_UE4(9);
        this.GAME_UE4_10 = GAME_UE4(10);
        this.GAME_UE4_11 = GAME_UE4(11);
        this.GAME_UE4_12 = GAME_UE4(12);
        this.GAME_UE4_13 = GAME_UE4(13);
        this.GAME_UE4_14 = GAME_UE4(14);
        this.GAME_UE4_15 = GAME_UE4(15);
        this.GAME_UE4_16 = GAME_UE4(16);
        this.GAME_UE4_17 = GAME_UE4(17);
        this.GAME_UE4_18 = GAME_UE4(18);
        this.GAME_UE4_19 = GAME_UE4(19);
        this.GAME_UE4_20 = GAME_UE4(20);
        this.GAME_UE4_21 = GAME_UE4(21);
        this.GAME_UE4_22 = GAME_UE4(22);
        this.GAME_UE4_23 = GAME_UE4(23);
        this.GAME_UE4_24 = GAME_UE4(24);
        this.GAME_UE4_25 = GAME_UE4(25);
        this.GAME_UE4_26 = GAME_UE4(26);
        this.version = ue4Versions[GAME_UE4_GET_MINOR(game)];
        this.GAME_UE4_LATEST = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION);
    };

    /**
     * @param {Number} x 
     */
    GAME_UE4(x) {
        return GAME_UE4(x);
    };
    
    /**
     * @param {Number} x 
     */
    GAME_UE4_GET_MINOR(x) {
        return GAME_UE4_GET_MINOR(x);
    };  

    /**
     * @param {Number} x 
     */
    GAME_UE4_GET_AR_VER(x) {
        return GAME_UE4_GET_AR_VER(x);
    };  
};

module.exports = Ue4Version;