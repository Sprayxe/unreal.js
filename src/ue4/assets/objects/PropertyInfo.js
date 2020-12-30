const PropertyType = require("./PropertyType");

class PropertyInfo {
    get index() { return 0 };
    get name() { return "" };
    get type() { return  new PropertyType() };
    get arrayDim() { return 1 };
    get field() { return null };

    /**
     * - Info about properties
     * @param {String} name 
     * @param {PropertyType} type 
     * @param {Number} arrayDim 
     */
    constructor(name, type, arrayDim) {
        this.name = name;
        this.type = type;
        this.arrayDim = arrayDim;
    };

    /**
     * - Info about properties
     * @param {*} json 
     */
    constructor(json) {
        this.index = json.index;
        this.name = json.name;
        this.type = new PropertyType(json);
        if (json.arraySize) this.arrayDim = json.arraySize;
    };

    /**
     * - Info about properties
     * @param {Field} field
     * @param {UProperty} ann 
     */
    constructor(field, ann) {
        this.field = field;
        this.type = new PropertyType();

        let name = null;
        if (ann != null) {
            name = ann.name?.length > 0 ? ann.name : null;
            this.arrayDim = ann.arrayDim;
            this.type.isEnumAsByte = ann.isEnumAsByte;
        };

        this.name = name ? name : field.name;
        this.type.setupWithField(field);
    };

    toString() {
        return `${this.index} = ${this.name}`;
    };
};

module.exports = PropertyInfo;