import { UObject } from "./UObject";
import { USCS_Node } from "./USCS_Node";
/**
 * USimpleConstructionScript
 * @extends {UObject}
 */
export declare class USimpleConstructionScript extends UObject {
    /**
     * Root nodes
     * @type {Array<USCS_Node>}
     * @public
     */
    RootNodes: USCS_Node[];
    /**
     * All nodes
     * @type {Array<USCS_Node>}
     * @public
     */
    AllNodes: USCS_Node[];
    /**
     * Default scene root node
     * @type {USCS_Node}
     * @public
     */
    DefaultSceneRootNode: USCS_Node;
}
