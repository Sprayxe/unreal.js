"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USimpleConstructionScript = void 0;
const UObject_1 = require("./UObject");
/**
 * USimpleConstructionScript
 * @extends {UObject}
 */
class USimpleConstructionScript extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Root nodes
         * @type {Array<USCS_Node>}
         * @public
         */
        this.RootNodes = null;
        /**
         * All nodes
         * @type {Array<USCS_Node>}
         * @public
         */
        this.AllNodes = null;
        /**
         * Default scene root node
         * @type {USCS_Node}
         * @public
         */
        this.DefaultSceneRootNode = null;
    }
}
exports.USimpleConstructionScript = USimpleConstructionScript;
