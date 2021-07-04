import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { TRange } from "../../core/math/TRange";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FEvaluationTreeEntryHandle
 */
export declare class FEvaluationTreeEntryHandle {
    /**
     * entryIndex
     * @type {number}
     * @public
     */
    entryIndex: number;
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
/**
 * FEntry
 * @implements {IStructType}
 */
declare class FEntry implements IStructType {
    /**
     * The index into Items of the first item
     * @type {number}
     * @public
     */
    startIndex: number;
    /**
     * The number of currently valid items
     * @type {number}
     * @public
     */
    size: number;
    /**
     * The total capacity of allowed items before reallocating
     * @type {number}
     * @public
     */
    capacity: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} startIndex
     * @param {number} size
     * @param {number} capacity
     * @constructor
     * @public
     */
    constructor(startIndex: number, size: number, capacity: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * TEvaluationTreeEntryContainer
 */
export declare class TEvaluationTreeEntryContainer<T> {
    /**
     * entries
     * @type {Array<FEntry>}
     * @public
     */
    entries: FEntry[];
    /**
     * items
     * @type {Array<any>}
     * @public
     */
    items: T[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new TEvaluationTreeEntryContainer(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T[]);
    /**
     * Creates an instance using values
     * @param {Array<FEntry>} entries Entries to use
     * @param {Array<any>} items Items to use
     * @constructor
     * @public
     */
    constructor(entries: FEntry[], items: T[]);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @example <TEvaluationTreeEntryContainer>.serialize(Ar, () => it.serialize(Ar))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (it: T[]) => void): void;
}
/**
 * FMovieSceneEvaluationTreeNodeHandle
 */
export declare class FMovieSceneEvaluationTreeNodeHandle {
    /**
     * childrenHandle
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    childrenHandle: FEvaluationTreeEntryHandle;
    /**
     * index
     * @type {number}
     * @public
     */
    index: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FEvaluationTreeEntryHandle} childrenHandle Children handle to use
     * @param {number} index Index to use
     * @constructor
     * @public
     */
    constructor(childrenHandle: FEvaluationTreeEntryHandle, index: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
/**
 * FMovieSceneEvaluationTreeNode
 * @implements {IStructType}
 */
export declare class FMovieSceneEvaluationTreeNode implements IStructType {
    /**
     * range
     * @type {TRange<number>}
     * @public
     */
    range: TRange<number>;
    /**
     * parent
     * @type {FMovieSceneEvaluationTreeNodeHandle}
     * @public
     */
    parent: FMovieSceneEvaluationTreeNodeHandle;
    /**
     * childrenId
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    childrenId: FEvaluationTreeEntryHandle;
    /**
     * dataId
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    dataId: FEvaluationTreeEntryHandle;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {TRange<number>} range Range to use
     * @param {FMovieSceneEvaluationTreeNodeHandle} parent Parent to use
     * @param {FEvaluationTreeEntryHandle} childrenId Children id to use
     * @param {FEvaluationTreeEntryHandle} dataId Data id to use
     */
    constructor(range: TRange<number>, parent: FMovieSceneEvaluationTreeNodeHandle, childrenId: FEvaluationTreeEntryHandle, dataId: FEvaluationTreeEntryHandle);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FMovieSceneEvaluationTree
 */
export declare class FMovieSceneEvaluationTree {
    /**
     * rootNode
     * @type {FMovieSceneEvaluationTreeNode}
     * @public
     */
    rootNode: FMovieSceneEvaluationTreeNode;
    /**
     * childNodes
     * @type {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>}
     * @public
     */
    childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FMovieSceneEvaluationTreeNode} rootNode Root node to use
     * @param {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>} childNodes Child nodes to use
     */
    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>);
    /**
     * Serializes this
     * @param {any[]} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args: any[]): void;
}
/**
 * TMovieSceneEvaluationTree
 * @extends {FMovieSceneEvaluationTree}
 */
export declare class TMovieSceneEvaluationTree<T> extends FMovieSceneEvaluationTree {
    /**
     * data
     * @type {TEvaluationTreeEntryContainer<any>}
     * @public
     */
    data: TEvaluationTreeEntryContainer<T>;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new TMovieSceneEvaluationTree(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T[]);
    /**
     * Creates an instance using values
     * @param {FMovieSceneEvaluationTreeNode} rootNode Root node to use
     * @param {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>} childNodes Child nodes to use
     * @param {TEvaluationTreeEntryContainer<any>} data Data to use
     * @constructor
     * @public
     */
    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>, data: TEvaluationTreeEntryContainer<T>);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @returns {void}
     * @example <TMovieSceneEvaluationTree>.serialize(Ar, (it) => it.serialize(Ar))
     * @public
     */
    serialize(Ar: FArchiveWriter, write?: (it: T[]) => void): void;
}
export {};
