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
     * @param {Array} nameMap 
     * @param {Number} index 
     * @param {Number} number 
     */
    constructor(nameMap, index, number) {
        nameMap = nameMap;
        index = index;
        number = number;
    };

    /**
     * @param {String} text 
     * @param {Number} number 
     */
    constructor(text, number) {
        nameMap = new Array(text);
        index = 0;
        number = number;
    };

    /**
     * @param {String[]} names 
     * @param {Number} index 
     * @param {Number} number 
     */
    constructor(names, index, number) {
        nameMap = names;
        index = index;
        number = number;
    };

    constructor();

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
        if (typeof(other) !== "FName") return false;

        if (this.text !== other.text) return false;

        return true;
    };

    hashCode() {
        let result = this.number;
        result =  31 * result + this.text.toLowerCase().split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        return result;
    };

    isNone() { return this.text === "None" };
}
module.exports = FName;
