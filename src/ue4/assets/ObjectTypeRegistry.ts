import { UnrealMap } from "../../util/UnrealMap"
import fs from "fs/promises";

export class ObjectTypeRegistry {
    static registry = {}

    static async init() {
        await this.registerEngine()
        await this.registerValorant()
        //await this.registerFortnite()
    }

    private static async registerEngine() {
        const dir = (await fs.readdir("./dist/ue4/assets/exports")).filter(f => !f.endsWith(".map"))
        for (const file of dir) {
            const clazz = (await import(`./exports/${file}`))[file.split(".").shift()]
            this.registerClass(clazz)
        }
    }

    private static async registerFortnite() {
        /*const dir = await fs.readdir("./dist/ue4/assets/exports")
        for (const file of dir) {
            const clazz = (await import(`./exports/${file}`))[file.split(".").shift()]
            this.registerClass(clazz)
        }*/
        throw new Error("Not implemented.")
    }

    private static async registerValorant() {
        const dir = (await fs.readdir("./dist/valorant/exports")).filter(f => !f.endsWith(".map"))
        for (const file of dir) {
            const clazz = (await import(`../../valorant/exports/${file}`))[file.split(".").shift()]
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
            if ((name[0] === 'U' || name[0] === 'A') && name[1] === name[1].toUpperCase()) {
                name = name.substring(1)
            }
            this.registerClass(name, x)
        }
    }

    static get(name: string) {
        return this.registry[name]
    }
}