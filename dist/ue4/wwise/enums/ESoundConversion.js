"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESoundConversion = void 0;
/**
 * ESoundConversion
 * @enum
 */
var ESoundConversion;
(function (ESoundConversion) {
    ESoundConversion[ESoundConversion["PCM"] = 1] = "PCM";
    ESoundConversion[ESoundConversion["ADPCM"] = 2] = "ADPCM";
    ESoundConversion[ESoundConversion["Vorbis"] = 4] = "Vorbis";
})(ESoundConversion = exports.ESoundConversion || (exports.ESoundConversion = {}));
