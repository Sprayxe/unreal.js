"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectRegistryOverrideIgnore = void 0;
function ObjectRegistryOverrideIgnore(constructor) {
    var _a;
    return _a = class extends constructor {
        },
        _a.ObjectRegistryIgnore = false,
        _a;
}
exports.ObjectRegistryOverrideIgnore = ObjectRegistryOverrideIgnore;
