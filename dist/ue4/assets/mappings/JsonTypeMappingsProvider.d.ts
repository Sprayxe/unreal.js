import { TypeMappingsProvider } from "./TypeMappingsProvider";
/**
 * Type mappings provider which uses json data
 * @abstract
 * @extends {TypeMappingsProvider}
 */
export declare abstract class JsonTypeMappingsProvider extends TypeMappingsProvider {
    /**
     * Adds a struct
     * @param {object} json JSON data
     * @returns {boolean} Whether if it was successful or not
     * @protected
     */
    protected addStructs(json: any): boolean;
    /**
     * Adds an enum
     * @param {object} json JSON data
     * @returns {boolean} Whether if it was successful or not
     * @protected
     */
    protected addEnums(json: any): boolean;
}
