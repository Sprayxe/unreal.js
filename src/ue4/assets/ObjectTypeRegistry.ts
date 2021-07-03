import fs from "fs/promises";

export class ObjectTypeRegistry {
    static registry = {}

    static async init() {
        const s = Date.now()
        await this.registerEngine()
        await this.registerValorant()
        await this.registerFortnite()
        const e = Date.now()
        console.log(`Registered ${Object.keys(this.registry).length} classes in ${e - s}ms.`)
    }

    private static async registerEngine() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir0 = (await fs.readdir(p + "/dist/ue4/assets/exports/mats")).filter(f => f.endsWith(".js"))
        const dir1 = (await fs.readdir(p + "/dist/ue4/assets/exports/tex")).filter(f => f.endsWith(".js"))
        const dir = (await fs.readdir(p + "/dist/ue4/assets/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir) {
            const clazz = (await import(`./exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
        for (const file of dir0) {
            const clazz = (await import(`./exports/mats/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
        for (const file of dir1) {
            const clazz = (await import(`./exports/tex/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
    }

    private static async registerFortnite() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir0 = (await fs.readdir(p + "/dist/fort/exports/variants")).filter(f => f.endsWith(".js"))
        const dir = (await fs.readdir(p + "/dist/fort/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir) {
            const clazz = (await import(`../../fort/exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
        // variants
        for (const file of dir0) {
            const clazz = (await import(`../../fort/exports/variants/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
    }

    private static async registerValorant() {
        //const p = process.cwd()
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir1 = (await fs.readdir(p + "/dist/valorant/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir1) {
            const clazz = (await import(`../../valorant/exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.register(clazz)
        }
    }

    static register(clazz: any)
    static register(serializedName: string, clazz: any)
    static register(x?: any, y?: any) {
        if (y) {
            this.registry[x] = y
        } else {
            this.register(this.unprefix(x.name), x)
        }
    }

    static get(name: string) {
        return this.registry[name]
    }

    static unprefix(str: string, includeF: boolean = false) {
        if ((str[0] === "U" || str[0] === "A" || (includeF ? str[0] === "F" : true))
            && str[1] === str[1].toUpperCase()) {
            return str.substring(1)
        }
        return str
    }
}