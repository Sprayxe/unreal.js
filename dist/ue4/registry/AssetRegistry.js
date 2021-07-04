"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetRegistry = void 0;
const FArchive_1 = require("../reader/FArchive");
const FByteArchive_1 = require("../reader/FByteArchive");
const FAssetRegistryVersion_1 = require("./objects/FAssetRegistryVersion");
const AssetRegistryArchive_1 = require("./reader/AssetRegistryArchive");
const Exceptions_1 = require("../../exceptions/Exceptions");
const NameTableArchive_1 = require("./reader/NameTableArchive");
const FAssetData_1 = require("./objects/FAssetData");
const FDependsNode_1 = require("./objects/FDependsNode");
const FAssetPackageData_1 = require("./objects/FAssetPackageData");
const UnrealArray_1 = require("../../util/UnrealArray");
class AssetRegistry {
    constructor(x, y) {
        this.fileName = y;
        this.originalAr = x instanceof FArchive_1.FArchive ? x : new FByteArchive_1.FByteArchive(x);
        // init
        const version = new FAssetRegistryVersion_1.FAssetRegistryVersion(this.originalAr);
        let Ar = null;
        if (version.version < FAssetRegistryVersion_1.Type.RemovedMD5Hash) {
            throw new Exceptions_1.ParserException("Cannot read states before this version");
        }
        else if (version.version < FAssetRegistryVersion_1.Type.FixedTags) {
            Ar = new NameTableArchive_1.FNameTableArchiveReader(this.originalAr);
        }
        else {
            Ar = new AssetRegistryArchive_1.FAssetRegistryReader(this.originalAr);
        }
        this.preallocatedAssetDataBuffer = Ar.readArray(() => new FAssetData_1.FAssetData(Ar));
        if (version.version <= FAssetRegistryVersion_1.Type.AddedDependencyFlags) {
            const localNumDependsNodes = Ar.readInt32();
            this.preallocatedDependsNodeDataBuffer = new UnrealArray_1.UnrealArray(localNumDependsNodes, () => new FDependsNode_1.FDependsNode());
            if (localNumDependsNodes > 0)
                this.loadDependenciesBeforeFlags(Ar, version);
        }
        else {
            const dependencySectionSize = Number(Ar.readInt64());
            const dependencySectionEnd = Ar.pos + dependencySectionSize;
            const localNumDependsNodes = Ar.readInt32();
            this.preallocatedDependsNodeDataBuffer = new UnrealArray_1.UnrealArray(localNumDependsNodes, () => new FDependsNode_1.FDependsNode());
            if (localNumDependsNodes > 0)
                this.loadDependencies(Ar);
            Ar.pos = dependencySectionEnd;
        }
        const serializeHash = version.version < FAssetRegistryVersion_1.Type.AddedCookedMD5Hash;
        this.preallocatedPackageDataBuffer = Ar.readArray(() => new FAssetPackageData_1.FAssetPackageData(Ar, serializeHash));
    }
    loadDependencies(Ar) {
        const self = this;
        function getNodeFromSerializeIndex(index) {
            if (index < 0 || self.preallocatedDependsNodeDataBuffer.length < index) {
                return null;
            }
            return self.preallocatedDependsNodeDataBuffer[index];
        }
        for (const dependsNode of this.preallocatedDependsNodeDataBuffer) {
            dependsNode.serializeLoad(Ar, getNodeFromSerializeIndex);
        }
    }
    loadDependenciesBeforeFlags(Ar, version) {
        for (const dependsNode of this.preallocatedDependsNodeDataBuffer) {
            dependsNode.serializeLoadBeforeFlags(Ar, version, this.preallocatedDependsNodeDataBuffer, this.preallocatedDependsNodeDataBuffer.length);
        }
    }
}
exports.AssetRegistry = AssetRegistry;
