import { PropertyType } from "./PropertyType";

export class PropertyInfo {
    index = 0
    name: string
    type = new PropertyType()
    arrayDim = 1

    constructor(json: any)
    constructor(name: string, type: PropertyType, arrayDim: number)
    constructor(...params) {
        if (typeof params[0] === "string") {
            this.name = params[0]
            this.type = params[1]
            this.arrayDim = params[2]
        } else {
            const json = params[0]
            this.index = json.index
            this.name = json.name
            this.type = new PropertyType(json)
            this.arrayDim = json.arrayDim || 0
        }
    }

    toString() {
        return `${this.index} = ${this.name}`
    }
}