"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.isNearlyZero = exports.square = exports.KINDA_SMALL_NUMBER = exports.SMALL_NUMBER = void 0;
exports.SMALL_NUMBER = 1e-8;
exports.KINDA_SMALL_NUMBER = 1e-4;
/**
 * Multiples value by itself
 * @param {number} a Num to square
 * @returns {number} Squared value
 */
function square(a) {
    return a * a;
}
exports.square = square;
/**
 * Checks if a floating point number is nearly zero.
 * @param {number} value Num to compare
 * @param {number} errorTolerance Maximum allowed difference for considering Value as 'nearly zero'
 * @returns {boolean} Whether value is nearly zero
 */
function isNearlyZero(value, errorTolerance = exports.SMALL_NUMBER) {
    return Math.abs(value) <= errorTolerance;
}
exports.isNearlyZero = isNearlyZero;
/**
 * Performs a linear interpolation between two values, alpha ranges from 0-1
 * @param {number} a Num a
 * @param {number} b Num b
 * @param {number} alpha Num alpha
 * @returns {number} Lerped value
 */
function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}
exports.lerp = lerp;
