"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESoundSource = void 0;
/**
 * ESoundSource
 * @enum
 */
var ESoundSource;
(function (ESoundSource) {
    ESoundSource[ESoundSource["Embedded"] = 0] = "Embedded";
    ESoundSource[ESoundSource["Streamed"] = 1] = "Streamed";
    ESoundSource[ESoundSource["StreamedZeroLatency"] = 2] = "StreamedZeroLatency";
})(ESoundSource = exports.ESoundSource || (exports.ESoundSource = {}));
