"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectRegistryIgnore = void 0;
function ObjectRegistryIgnore(constructor) {
    var _a;
    return _a = class extends constructor {
        },
        _a.ObjectRegistryIgnore = true,
        _a;
}
exports.ObjectRegistryIgnore = ObjectRegistryIgnore;
