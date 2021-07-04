"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFieldPath = void 0;
const FName_1 = require("./uobject/FName");
const ObjectResource_1 = require("./uobject/ObjectResource");
const FAssetArchive_1 = require("../assets/reader/FAssetArchive");
/**
 * FFieldPath
 */
class FFieldPath {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x) {
            if (x instanceof FAssetArchive_1.FAssetArchive) {
                this.path = x.readArray(() => x.readFName());
                if (this.path.length === 1 && this.path[0] === FName_1.FName.NAME_None) {
                    this.path = [];
                }
                this.resolvedOwner = new ObjectResource_1.FPackageIndex(x);
            }
            else {
                this.path = x;
                this.resolvedOwner = y;
            }
        }
        else {
            this.path = [];
            this.resolvedOwner = new ObjectResource_1.FPackageIndex();
        }
    }
}
exports.FFieldPath = FFieldPath;
