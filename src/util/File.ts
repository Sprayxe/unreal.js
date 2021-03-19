export class File {
    path: string
    name: string
    content: Buffer

    constructor(path: string, content: Buffer) {
        this.name = path.split("/").pop()
        this.content = content
        this.path = path
    }

    toString() {
        return this.path
    }
}