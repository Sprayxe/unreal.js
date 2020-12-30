
let type = null;
let structName = null;
let bool = false;
let enumName = null;
let isEnumAsByte = true;
let innerType = null;
let valueType = null;
let structClass = [];
let enumClass = null;

class PropertyType {
    get type() { return type };
    get structType() { return structType };
    get bool() { return bool };
    get enumName() { return enumName };
    get isEnumAsByte() { return isEnumAsByte };
    get innerType() { return innerType };
    get valueType() { return valueType };
    get structClass() { return structClass };
    get enumClass() { return enumClass };

    constructor();
    /**
     * @param {Object} json 
     */
    constructor(json);

    constructor(tag) {
        typ = tag.type;
        strc = tag.structName;
        bool = tag.boolVal;
        enM = tag.enumName;
        innerType = new PropertyType(tag.innerType);
        valueType = new PropertyType(tag.valueType);
    };

    
};

module.exports = PropertyType;