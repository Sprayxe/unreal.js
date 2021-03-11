const PropertyType = require("./PropertyType");

let ind = 0;
let nam = "";
let typ = new PropertyType();
let arr = 1;
let fie = null;

class PropertyInfo {
    get index() { ind };
    get name() { nam };
    get type() { typ };
    get arrayDim() { arr };
    get field() { fie };

    /**
     * - Info about properties
     * @param {String} name 
     * @param {PropertyType} type 
     * @param {Number} arrayDim 
     */
    constructor(name, type, arrayDim) {
        nam = name;
        typ = type;
        arr = arrayDim;
    };

    /**
     * - Info about properties
     * @param {*} json 
     */
    constructor(json) {
        ind = json.index;
        nam = json.name;
        typ = new PropertyType(json);
        if (json.arraySize) arr = json.arraySize;
    };

    /**
     * - Info about properties
     * @param {Field} field
     * @param {UProperty} ann 
     */
    constructor(field, ann) {
        fie = field;
        typ = new PropertyType();

        let name = null;
        if (ann != null) {
            name = ann.name?.length > 0 ? ann.name : null;
            arr = ann.arrayDim;
            typ.isEnumAsByte = ann.isEnumAsByte;
        };

        nam = name ? name : field.name;
        typ.setupWithField(field);
    };

    toString() {
        return `${ind} = ${nam}`;
    };
};

module.exports = PropertyInfo;