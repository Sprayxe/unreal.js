"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectRef = void 0;
class ObjectRef {
    constructor(element) {
        this.element = element;
    }
    static ref(element) {
        return new ObjectRef(element);
    }
}
exports.ObjectRef = ObjectRef;
