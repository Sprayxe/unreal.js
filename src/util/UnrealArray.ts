export class UnrealArray<T> extends Array<T> {
    constructor(length: number, init: (index: number) => T) {
        super()
        if (length > 0 && init) {
            for (let i = 0; i < length; ++i) {
                this.push(init(i))
            }
        }
    }
}