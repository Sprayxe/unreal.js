export const SMALL_NUMBER = 1e-8
export const KINDA_SMALL_NUMBER = 1e-4

/**
 * Multiples value by itself
 * @param {number} a Num to square
 * @returns {number} Squared value
 */
export function square(a: number) {
    return a * a
}

/**
 * Checks if a floating point number is nearly zero.
 * @param {number} value Num to compare
 * @param {number} errorTolerance Maximum allowed difference for considering Value as 'nearly zero'
 * @returns {boolean} Whether value is nearly zero
 */
export function isNearlyZero(value: number, errorTolerance: number = SMALL_NUMBER) {
    return Math.abs(value) <= errorTolerance
}

/**
 * Performs a linear interpolation between two values, alpha ranges from 0-1
 * @param {number} a Num a
 * @param {number} b Num b
 * @param {number} alpha Num alpha
 * @returns {number} Lerped value
 */
export function lerp(a: number, b: number, alpha: number) {
    return a + alpha * (b - a)
}