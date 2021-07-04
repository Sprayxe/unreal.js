"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnrealMap = void 0;
const collection_1 = __importDefault(require("@discordjs/collection"));
class UnrealMap extends collection_1.default {
    get(key) {
        if (key.equals) {
            return super.find((v, k) => k.equals(key));
        }
        else {
            return super.get(key);
        }
    }
    delete(key) {
        if (key.equals) {
            const backup = this;
            this.clear();
            backup
                .filter((v, k) => !k.equals(key))
                .forEach((v, k) => this.set(k, v));
            return this.size !== backup.size;
        }
        else {
            return super.delete(key);
        }
    }
}
exports.UnrealMap = UnrealMap;
