"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMovieSceneEvaluationTree = exports.FMovieSceneEvaluationTree = exports.FMovieSceneEvaluationTreeNode = exports.FMovieSceneEvaluationTreeNodeHandle = exports.TEvaluationTreeEntryContainer = exports.FEvaluationTreeEntryHandle = void 0;
const FArchive_1 = require("../../../reader/FArchive");
const TRange_1 = require("../../core/math/TRange");
/**
 * FEvaluationTreeEntryHandle
 */
class FEvaluationTreeEntryHandle {
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.entryIndex = arg instanceof FArchive_1.FArchive ? arg.readInt32() : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.entryIndex);
    }
}
exports.FEvaluationTreeEntryHandle = FEvaluationTreeEntryHandle;
/**
 * FEntry
 * @implements {IStructType}
 */
class FEntry {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this.startIndex = x.readInt32();
            this.size = x.readInt32();
            this.capacity = x.readInt32();
        }
        else {
            this.startIndex = x;
            this.size = y;
            this.capacity = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.startIndex);
        Ar.writeInt32(this.size);
        Ar.writeInt32(this.capacity);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            startIndex: this.startIndex,
            size: this.size,
            capacity: this.capacity
        };
    }
}
/**
 * TEvaluationTreeEntryContainer
 */
class TEvaluationTreeEntryContainer {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.entries = x.readArray(() => new FEntry(x));
            this.items = y();
        }
        else {
            this.entries = x;
            this.items = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @example <TEvaluationTreeEntryContainer>.serialize(Ar, () => it.serialize(Ar))
     * @returns {void}
     * @public
     */
    serialize(Ar, write) {
        Ar.writeTArray(this.entries, (it) => it.serialize(Ar));
        write(this.items);
    }
}
exports.TEvaluationTreeEntryContainer = TEvaluationTreeEntryContainer;
/**
 * FMovieSceneEvaluationTreeNodeHandle
 */
class FMovieSceneEvaluationTreeNodeHandle {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.childrenHandle = new FEvaluationTreeEntryHandle(x);
            this.index = x.readInt32();
        }
        else {
            this.childrenHandle = x;
            this.index = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.childrenHandle.serialize(Ar);
        Ar.writeInt32(this.index);
    }
}
exports.FMovieSceneEvaluationTreeNodeHandle = FMovieSceneEvaluationTreeNodeHandle;
/**
 * FMovieSceneEvaluationTreeNode
 * @implements {IStructType}
 */
class FMovieSceneEvaluationTreeNode {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        if (args.length === 1) {
            const Ar = args[0];
            this.range = new TRange_1.TRange(Ar, () => Ar.readInt32());
            this.parent = new FMovieSceneEvaluationTreeNodeHandle(Ar);
            this.childrenId = new FEvaluationTreeEntryHandle(Ar);
            this.dataId = new FEvaluationTreeEntryHandle(Ar);
        }
        else {
            this.range = args[0];
            this.parent = args[1];
            this.childrenId = args[2];
            this.dataId = args[3];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.range.serialize(Ar, (it) => Ar.writeInt32(it));
        this.parent.serialize(Ar);
        this.childrenId.serialize(Ar);
        this.dataId.serialize(Ar);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            range: this.range.toJson(),
            parent: {
                index: this.parent.index,
                childrenHandle: {
                    entryIndex: this.parent.childrenHandle.entryIndex
                }
            },
            childrenId: {
                entryIndex: this.childrenId.entryIndex
            },
            dataId: {
                entryIndex: this.dataId.entryIndex
            }
        };
    }
}
exports.FMovieSceneEvaluationTreeNode = FMovieSceneEvaluationTreeNode;
/**
 * FMovieSceneEvaluationTree
 */
class FMovieSceneEvaluationTree {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.rootNode = new FMovieSceneEvaluationTreeNode(x);
            this.childNodes = new TEvaluationTreeEntryContainer(x, () => x.readArray(() => new FMovieSceneEvaluationTreeNode(x)));
        }
    }
    /**
     * Serializes this
     * @param {any[]} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args) {
        const Ar = args[0];
        this.rootNode.serialize(Ar);
        this.childNodes.serialize(Ar, (items) => Ar.writeTArray(items, (it) => it.serialize(Ar)));
    }
}
exports.FMovieSceneEvaluationTree = FMovieSceneEvaluationTree;
/**
 * TMovieSceneEvaluationTree
 * @extends {FMovieSceneEvaluationTree}
 */
class TMovieSceneEvaluationTree extends FMovieSceneEvaluationTree {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            super(x);
            this.data = new TEvaluationTreeEntryContainer(x, y);
        }
        else {
            super(x, y);
            this.data = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @returns {void}
     * @example <TMovieSceneEvaluationTree>.serialize(Ar, (it) => it.serialize(Ar))
     * @public
     */
    serialize(Ar, write) {
        super.serialize(Ar);
        if (write)
            this.data.serialize(Ar, write);
    }
}
exports.TMovieSceneEvaluationTree = TMovieSceneEvaluationTree;
