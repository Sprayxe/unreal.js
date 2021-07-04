"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UWorld = void 0;
const UObject_1 = require("./UObject");
/**
 * UWorld
 * @extends {UObject}
 */
class UWorld extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * persistentLevel
         * @type {ULevel}
         * @public
         */
        this.persistentLevel = null;
        /**
         * extraReferencedObjects
         * @type {UObject}
         * @public
         */
        this.extraReferencedObjects = null;
        /**
         * streamingLevels
         * @type {UObject}
         * @public
         */
        this.streamingLevels = null;
    }
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.persistentLevel = Ar.readObject();
        this.extraReferencedObjects = Ar.readObject();
        this.streamingLevels = Ar.readObject();
    }
}
exports.UWorld = UWorld;
