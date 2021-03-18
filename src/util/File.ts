export class File {
    name: string
    content: Buffer

    constructor(name: string, content: Buffer) {
        this.name = name
        this.content = content
    }

    toString() {
        return this.name
    }
}