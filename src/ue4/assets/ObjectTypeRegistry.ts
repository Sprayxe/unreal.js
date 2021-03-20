import { UnrealMap } from "../../util/UnrealMap"

export class ObjectTypeRegistry {
    static classes: UnrealMap<string, any> = new UnrealMap()
    static structs: UnrealMap<string, any> = new UnrealMap()

    static init() {
        this.registerEngine()
        this.registerFortnite()
    }

    private static registerEngine() {

    }

    private static registerFortnite() {

    }

    static registerClass(clazz: any)
    static registerClass(serializedName: string, clazz: any)
    static registerClass(x?: any, y?: any) {
        if (this.classes.size < 1) this.init()
        if (y) {
            this.classes.set(x, y)
        } else {
            let name = x.name
            if ((name[0] === 'U' || name[0] === 'A') && name[1].isUpperCase()) {
                name = name.substring(1)
            }
            this.registerClass(name, x)
        }
    }

    static registerStruct(clazz: any)
    static registerStruct(serializedName: string, clazz: any)
    static registerStruct(x?: any, y?: any) {
        if (this.structs.size < 1) this.init()
        if (y) {
            this.structs.set(x, y)
        } else {
            let name = x.name
            if ((name[0] === 'U' || name[0] === 'A') && name[1].isUpperCase()) {
                name = name.substring(1)
            }
            this.registerStruct(name, x)
        }
    }

    static get(name: string) {
        return this.classes.get(name) || this.structs.get(name)
    }
}