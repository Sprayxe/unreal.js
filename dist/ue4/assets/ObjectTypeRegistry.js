"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectTypeRegistry = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class ObjectTypeRegistry {
    static async init() {
        const s = Date.now();
        await this.registerEngine();
        await this.registerValorant();
        await this.registerFortnite();
        const e = Date.now();
        console.log(`Registered ${Object.keys(this.registry).length} classes in ${e - s}ms.`);
    }
    static async registerEngine() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js";
        const dir0 = (await promises_1.default.readdir(p + "/dist/ue4/assets/exports/mats")).filter(f => f.endsWith(".js"));
        const dir1 = (await promises_1.default.readdir(p + "/dist/ue4/assets/exports/tex")).filter(f => f.endsWith(".js"));
        const dir = (await promises_1.default.readdir(p + "/dist/ue4/assets/exports")).filter(f => f.endsWith(".js"));
        for (const file of dir) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`./exports/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
        for (const file of dir0) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`./exports/mats/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
        for (const file of dir1) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`./exports/tex/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
    }
    static async registerFortnite() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js";
        const dir0 = (await promises_1.default.readdir(p + "/dist/fort/exports/variants")).filter(f => f.endsWith(".js"));
        const dir = (await promises_1.default.readdir(p + "/dist/fort/exports")).filter(f => f.endsWith(".js"));
        for (const file of dir) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`../../fort/exports/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
        // variants
        for (const file of dir0) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`../../fort/exports/variants/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
    }
    static async registerValorant() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js";
        const dir1 = (await promises_1.default.readdir(p + "/dist/valorant/exports")).filter(f => f.endsWith(".js"));
        for (const file of dir1) {
            const clazz = (await Promise.resolve().then(() => __importStar(require(`../../valorant/exports/${file}`))))[file.split(".").shift()];
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz);
        }
    }
    static register(x, y) {
        if (y) {
            this.registry[x] = y;
        }
        else {
            this.register(this.unprefix(x.name), x);
        }
    }
    static get(name) {
        return this.registry[name];
    }
    static unprefix(str, includeF = false) {
        if ((str[0] === "U" || str[0] === "A" || (includeF ? str[0] === "F" : true))
            && str[1] === str[1].toUpperCase()) {
            return str.substring(1);
        }
        return str;
    }
}
exports.ObjectTypeRegistry = ObjectTypeRegistry;
ObjectTypeRegistry.registry = {};
