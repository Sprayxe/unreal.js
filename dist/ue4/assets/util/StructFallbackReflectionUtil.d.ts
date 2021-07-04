import { FPropertyTag } from "../objects/FPropertyTag";
/**
 * This does apply properties to an object
 * but it doesn't check the object's property names (Whether lower/uppercase, Whether it exists etc.)
 * @param {Array<FPropertyTag>} properties Properties to apply
 * @param {any} obj Object to apply properties to
 * @returns {void}
 * @export
 */
export declare function mapToClass<T>(properties: FPropertyTag[], obj: T): T;
