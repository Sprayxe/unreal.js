// this is a mess
export class StringBuilder {
	value: any[] = []

	constructor(value: any = "") {
		if (typeof value === "number") {
			this.value = new Array(value)
		} else {
			this.value.push(value)
		}
	}

	append(value: string, offset?: number, length?: number): this {
		if (offset) {
			if (offset > this.value.length)
				throw new Error(`Cannot insert at position ${offset}, extends the limit of ${this.value.length}`)
			if (length) {
				let x = 0
				while (x < length) {
					this.value.splice(offset, 0, value)
					++x
				}
			} else {
				this.value.splice(offset, 0, value)
			}
		} else {
			this.value.push(value)
		}
		return this
	}

	toString(): string {
		return this.value.join("")
	}

	get length(): number {
		return this.toString().length
	}
}