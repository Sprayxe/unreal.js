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
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir0 = (await fs.readdir(p + "/dist/ue4/assets/exports/mats")).filter(f => f.endsWith(".js"))
        const dir1 = (await fs.readdir(p + "/dist/ue4/assets/exports/tex")).filter(f => f.endsWith(".js"))
        const dir = (await fs.readdir(p + "/dist/ue4/assets/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir) {
            const clazz = (await import(`./exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
        for (const file of dir0) {
            const clazz = (await import(`./exports/mats/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
        for (const file of dir1) {
            const clazz = (await import(`./exports/tex/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
    }

    private static async registerFortnite() {
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir0 = (await fs.readdir(p + "/dist/fort/exports/variants")).filter(f => f.endsWith(".js"))
        const dir = (await fs.readdir(p + "/dist/fort/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir) {
            const clazz = (await import(`../../fort/exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
        // variants
        for (const file of dir0) {
            const clazz = (await import(`../../fort/exports/variants/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
    }

    private static async registerValorant() {
        const p = process.cwd() + "/node_modules/unreal.js"
        const dir1 = (await fs.readdir(p + "/dist/valorant/exports")).filter(f => f.endsWith(".js"))
        for (const file of dir1) {
            const clazz = (await import(`../../valorant/exports/${file}`))[file.split(".").shift()]
            if (clazz.ObjectRegistryIgnore)
                continue;
            this.registerClass(clazz)
        }
    }

    static registerClass(clazz: any)
    static registerClass(serializedName: string, clazz: any)
    static registerClass(x?: any, y?: any) {
        if (y) {
            this.registry[x] = y
        } else {
            let name = x.name as string
            if ((name[0] === "U" || name[0] === "A") && name[1] === name[1].toUpperCase()) {
                name = name.substring(1)
            }
            this.registerClass(name, x)
        }
    }

    static get(name: string) {
        return this.registry[name]
    }
}