"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUProperty = exports.UProperty = void 0;
require("reflect-metadata");
const UPropertyMetadataKey = Symbol("UProperty");
function UProperty(data = defaultData) {
    return Reflect.metadata(UPropertyMetadataKey, data);
}
exports.UProperty = UProperty;
function getUProperty(target, propertyKey) {
    return Reflect.getMetadata(UPropertyMetadataKey, target, propertyKey);
}
exports.getUProperty = getUProperty;
const defaultData = {
    name: "",
    skipPrevious: 0,
    skipNext: 0,
    arrayDim: 1,
    isEnumAsByte: true,
    innerType: null,
    valueType: null
};
