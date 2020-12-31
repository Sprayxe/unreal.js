const FNameEntry = require("./FNameEntry");

let nameMap = [];
let index = 0;
let number = 0;

class FName {
    // companion object
    get NAME_None() { return new FName() };
    get NONE_SINGLETON_LIST() { return new Array(new FNameEntry("None", 0, 0)) };

    // constructor properties
    get nameMap() { return nameMap };
    get index() { return index };
    get number() { return number };

    /**
     * @param {String | Number | undefined} params 
     */
    constructor(...params) {
        params.forEach((v, k) => {
            if (k === 0) {
                switch (typeof k) {
                    case "string":
                        nameMap = new Array(text);
                        break;
                    default:
                        nameMap = v;
                        break;
                };
            } else if (k === 1) {
                switch (typeof k) {
                    case "number":
                        if (!params[2]) {
                            number = v;
                        } else {
                            index = v;
                        };
                        break;
                };
            } else {
                switch (typeof k) {
                    case "number":
                        number = number;
                        break;
                };
            };
        });
    };

    /**
     * @returns {String}
     */
    toString() {
        return number == 0 ? this.nameMap[this.index] : `${this.nameMap[index]}_${this.number - 1}`;
    };

    get text() {
        return this.toString();
    };

    equals(other) {
        if (this === other) return true;
        if (typeof (other) !== "FName") return false;

        if (this.text !== other.text) return false;

        return true;
    };

    hashCode() {
        let result = this.number;
        result = 31 * result + this.text.toLowerCase().split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
        return result;
    };

    isNone() { return this.text === "None" };
}
module.exports = FName;
