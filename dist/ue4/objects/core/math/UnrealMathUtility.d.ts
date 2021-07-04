export declare const SMALL_NUMBER = 1e-8;
export declare const KINDA_SMALL_NUMBER = 0.0001;
/**
 * Multiples value by itself
 * @param {number} a Num to square
 * @returns {number} Squared value
 */
export declare function square(a: number): number;
/**
 * Checks if a floating point number is nearly zero.
 * @param {number} value Num to compare
 * @param {number} errorTolerance Maximum allowed difference for considering Value as 'nearly zero'
 * @returns {boolean} Whether value is nearly zero
 */
export declare function isNearlyZero(value: number, errorTolerance?: number): boolean;
/**
 * Performs a linear interpolation between two values, alpha ranges from 0-1
 * @param {number} a Num a
 * @param {number} b Num b
 * @param {number} alpha Num alpha
 * @returns {number} Lerped value
 */
export declare function lerp(a: number, b: number, alpha: number): number;
