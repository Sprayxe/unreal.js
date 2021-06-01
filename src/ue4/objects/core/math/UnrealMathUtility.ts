export const SMALL_NUMBER = 1e-8
export const KINDA_SMALL_NUMBER = 1e-4

/** Multiples value by itself */
export function square(a: number) {
    return a * a
}

/**
 * Checks if a floating point number is nearly zero.
 * @param value Number to compare
 * @param errorTolerance Maximum allowed difference for considering Value as 'nearly zero'
 * @return true if Value is nearly zero
 */
export function isNearlyZero(value: number, errorTolerance: number = SMALL_NUMBER) {
    return Math.abs(value) <= errorTolerance
}

/** Performs a linear interpolation between two values, alpha ranges from 0-1 */
export function lerp(a: number, b: number, alpha: number) {
    return a + alpha * (b - a)
}