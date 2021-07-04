import { TMovieSceneEvaluationTree } from "./FMovieSceneEvaluationTree";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FSectionEvaluationDataTree
 * @implements {IStructType}
 */
export declare class FSectionEvaluationDataTree implements IStructType {
    /**
     * tree
     * @type {TMovieSceneEvaluationTree<FStructFallback>}
     * @public
     */
    tree: TMovieSceneEvaluationTree<FStructFallback>;
    /**
     * Creates an instance using UE4 Asset Reader or TMovieSceneEvaluationTree<FStructFallback>
     * @param {FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>);
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
