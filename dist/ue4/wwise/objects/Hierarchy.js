"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hierarchy = void 0;
const EHierarchyObjectType_1 = require("../enums/EHierarchyObjectType");
class Hierarchy {
    constructor(Ar) {
        this.type = Ar.readInt32();
        this.length = Ar.readInt32();
        Ar.pos += this.length; // remove this if you want to read additional data
        this.data = null; // TODO implement hierarchy types
    }
    toJson() {
        return {
            type: Object.keys(EHierarchyObjectType_1.EHierarchyObjectType).find(e => EHierarchyObjectType_1.EHierarchyObjectType[e] === this.type),
            length: this.length,
            data: this.data?.toJson()
        };
    }
}
exports.Hierarchy = Hierarchy;
