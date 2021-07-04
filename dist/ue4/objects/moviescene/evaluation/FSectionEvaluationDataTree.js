"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSectionEvaluationDataTree = void 0;
const FMovieSceneEvaluationTree_1 = require("./FMovieSceneEvaluationTree");
const FStructFallback_1 = require("../../../assets/objects/FStructFallback");
const FAssetArchive_1 = require("../../../assets/reader/FAssetArchive");
const FName_1 = require("../../uobject/FName");
// Note: this struct was removed in this commit:
// https://github.com/EpicGames/UnrealEngine/commit/76506dfcdc705f50a9bde3b4bd08bd6514d2cd4d#diff-6fef167d7afd2b5d1e22e25965e6c8d0717bb388e426ee26c8be670283984547
/**
 * FSectionEvaluationDataTree
 * @implements {IStructType}
 */
class FSectionEvaluationDataTree {
    /**
     * Creates an instance using UE4 Asset Reader or TMovieSceneEvaluationTree<FStructFallback>
     * @param {FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.tree = arg instanceof FAssetArchive_1.FAssetArchive
            ? new FMovieSceneEvaluationTree_1.TMovieSceneEvaluationTree(arg, () => arg.readArray(() => new FStructFallback_1.FStructFallback(arg, FName_1.FName.dummy("SectionEvaluationData"))))
            : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.tree.serialize(Ar);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            tree: {
                data: {
                    items: this.tree.data.items.map(i => i.toJson()),
                    entries: this.tree.data.entries.map(e => e.toJson())
                },
                childNodes: {
                    items: this.tree.data.items.map(i => i.toJson()),
                    entries: this.tree.data.entries.map(e => e.toJson())
                },
                rootNode: this.tree.rootNode.toJson()
            }
        };
    }
}
exports.FSectionEvaluationDataTree = FSectionEvaluationDataTree;
