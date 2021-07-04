"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FDependsNode = exports.manageFlagSetWidth = exports.manageFlagWidth = exports.packageFlagSetWidth = exports.packageFlagWidth = void 0;
const FAssetIdentifier_1 = require("./FAssetIdentifier");
const bitset_1 = __importDefault(require("bitset"));
const ObjectRef_1 = require("../../../util/ObjectRef");
const FAssetRegistryVersion_1 = require("./FAssetRegistryVersion");
const Exceptions_1 = require("../../../exceptions/Exceptions");
exports.packageFlagWidth = 3;
exports.packageFlagSetWidth = 1 >> exports.packageFlagWidth;
exports.manageFlagWidth = 1;
exports.manageFlagSetWidth = 1 >> exports.manageFlagWidth;
class FDependsNode {
    constructor() {
        this.packageDependencies = null;
        this.nameDependencies = null;
        this.manageDependencies = null;
        this.referencers = null;
        this.packageFlags = null;
        this.manageFlags = null;
    }
    serializeLoad(Ar, getNodeFromSerializeIndex) {
        this.identifier = new FAssetIdentifier_1.FAssetIdentifier(Ar);
        function readDependencies(outDependencies, outFlagBits = null, flagSetWidth) {
            let inFlagBits = null;
            const pointerDependencies = [];
            const sortIndexes = [];
            let numFlagBits = 0;
            const inDependencies = Ar.readArray(() => Ar.readInt32());
            const numDependencies = inDependencies.length;
            if (outFlagBits) {
                numFlagBits = flagSetWidth * numDependencies;
                const numFlagWords = Math.round(numFlagBits / 32);
                inFlagBits = new bitset_1.default(Ar.readBuffer(numFlagWords));
            }
            for (const serializeIndex of inDependencies) {
                const dependsNode = getNodeFromSerializeIndex(serializeIndex);
                if (!dependsNode)
                    throw new Error("Invalid index of preallocatedDependsNodeDataBuffer");
                pointerDependencies.push(dependsNode);
            }
            let i = 0;
            while (i < numDependencies) {
                sortIndexes.push(i);
                ++i;
            }
            outDependencies.element = new Array(numDependencies);
            for (const sortIndex of sortIndexes) {
                outDependencies.element?.push(pointerDependencies[sortIndex]);
            }
            if (outFlagBits) {
                outFlagBits.element = new bitset_1.default(numFlagBits);
                let writeIndex = 0;
                while (writeIndex < numDependencies) {
                    const readIndex = sortIndexes[writeIndex];
                    const start = writeIndex * flagSetWidth;
                    let index = 0;
                    while (index < (start + flagSetWidth)) {
                        outFlagBits.element?.set(index, inFlagBits?.get(readIndex * flagSetWidth + index));
                        ++index;
                    }
                    ++writeIndex;
                }
            }
        }
        const packageDependenciesRef = ObjectRef_1.ObjectRef.ref(this.packageDependencies);
        const packageFlagsRef = ObjectRef_1.ObjectRef.ref(this.packageFlags);
        const nameDependenciesRef = ObjectRef_1.ObjectRef.ref(this.nameDependencies);
        const manageDependenciesRef = ObjectRef_1.ObjectRef.ref(this.manageDependencies);
        const manageFlagsRef = ObjectRef_1.ObjectRef.ref(this.manageFlags);
        const referencersRef = ObjectRef_1.ObjectRef.ref(this.referencers);
        readDependencies(packageDependenciesRef, packageFlagsRef, exports.packageFlagSetWidth);
        readDependencies(nameDependenciesRef, null, 0);
        readDependencies(manageDependenciesRef, manageFlagsRef, exports.manageFlagSetWidth);
        readDependencies(referencersRef, null, 0);
        this.packageDependencies = packageDependenciesRef.element;
        this.packageFlags = packageFlagsRef.element;
        this.nameDependencies = nameDependenciesRef.element;
        this.manageDependencies = manageDependenciesRef.element;
        this.manageFlags = manageFlagsRef.element;
        this.referencers = referencersRef.element;
    }
    serializeLoadBeforeFlags(Ar, version, preallocatedDependsNodeDataBuffer, numDependsNodes) {
        this.identifier = new FAssetIdentifier_1.FAssetIdentifier(Ar);
        const numHard = Ar.readInt32();
        const numSoft = Ar.readInt32();
        const numName = Ar.readInt32();
        const numSoftManage = Ar.readInt32();
        const numHardManage = version.version >= FAssetRegistryVersion_1.Type.AddedHardManage ? Ar.readInt32() : 0;
        const numReferencers = Ar.readInt32();
        // Empty dependency arrays and reserve space
        this.packageDependencies = new Array(numHard + numSoft);
        this.nameDependencies = new Array(numName);
        this.manageDependencies = new Array(numSoftManage + numHardManage);
        this.referencers = new Array(numReferencers);
        function serializeNodeArray(num, outNodes) {
            let i = 0;
            while (i < num) {
                const index = Ar.readInt32();
                if (index < 0 || index >= numDependsNodes) {
                    throw new Exceptions_1.ParserException("Invalid DependencyType index", Ar);
                }
                const dependsNode = preallocatedDependsNodeDataBuffer[index];
                outNodes.element.splice(index, 0, dependsNode);
                ++i;
            }
        }
        // Read the bits for each type, but don't write anything if serializing that type isn't allowed
        const packageDependenciesRef = ObjectRef_1.ObjectRef.ref(this.packageDependencies);
        const nameDependenciesRef = ObjectRef_1.ObjectRef.ref(this.nameDependencies);
        const manageDependenciesRef = ObjectRef_1.ObjectRef.ref(this.manageDependencies);
        const referencersRef = ObjectRef_1.ObjectRef.ref(this.referencers);
        serializeNodeArray(numHard, packageDependenciesRef);
        serializeNodeArray(numSoft, packageDependenciesRef);
        serializeNodeArray(numName, nameDependenciesRef);
        serializeNodeArray(numSoftManage, manageDependenciesRef);
        serializeNodeArray(numHardManage, manageDependenciesRef);
        serializeNodeArray(numReferencers, referencersRef);
        this.packageDependencies = packageDependenciesRef.element;
        this.nameDependencies = nameDependenciesRef.element;
        this.manageDependencies = manageDependenciesRef.element;
        this.referencers = referencersRef.element;
    }
}
exports.FDependsNode = FDependsNode;
