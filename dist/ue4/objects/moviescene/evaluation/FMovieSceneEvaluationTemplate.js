"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMovieSceneEvaluationTemplate = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FMovieSceneEvaluationTemplate
 * @implements {IStructType}
 */
class FMovieSceneEvaluationTemplate {
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.value = arg instanceof FArchive_1.FArchive ? arg.readUInt32() : arg;
    }
    /**
     * Turns this into a date
     * @returns {Date}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.value;
    }
}
exports.FMovieSceneEvaluationTemplate = FMovieSceneEvaluationTemplate;
