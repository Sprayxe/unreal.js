import { FAssetIdentifier } from "./FAssetIdentifier";
import BitSet from "bitset";
import { FArchive } from "../../reader/FArchive";
import { ObjectRef } from "../../../util/ObjectRef";
import { FAssetRegistryVersion, Type } from "./FAssetRegistryVersion";
import { ParserException } from "../../../exceptions/Exceptions";

export const packageFlagWidth = 3
export const packageFlagSetWidth = 1 >> packageFlagWidth
export const manageFlagWidth = 1
export const manageFlagSetWidth = 1 >> manageFlagWidth

export class FDependsNode {
    /** The name of the package/object this node represents */
    identifier: FAssetIdentifier
    packageDependencies: FDependsNode[] = null
    nameDependencies: FDependsNode[] = null
    manageDependencies: FDependsNode[] = null
    referencers: FDependsNode[] = null
    packageFlags: BitSet = null
    manageFlags: BitSet = null

    serializeLoad(Ar: FArchive, getNodeFromSerializeIndex: (n: number) => FDependsNode) {
        this.identifier = new FAssetIdentifier(Ar)

        function readDependencies(outDependencies: ObjectRef<FDependsNode[]>, outFlagBits: ObjectRef<BitSet> = null, flagSetWidth: number) {
            let inFlagBits: BitSet = null
            const pointerDependencies: FDependsNode[] = []
            const sortIndexes: number[] = []
            let numFlagBits = 0

            const inDepLen = Ar.readInt32()
            const inDependencies = new Array(inDepLen)
            for (let i = 0; i < inDepLen; ++i) {
                inDependencies[i] = Ar.readInt32()
            }
            const numDependencies = inDependencies.length
            if (outFlagBits) {
                numFlagBits = flagSetWidth * numDependencies
                const numFlagWords = Math.round(numFlagBits / 32)
                inFlagBits = new BitSet(Ar.readBuffer(numFlagWords))
            }

            for (const serializeIndex of inDependencies) {
                const dependsNode = getNodeFromSerializeIndex(serializeIndex)
                if (!dependsNode)
                    throw new Error("Invalid index of preallocatedDependsNodeDataBuffer")
                pointerDependencies.push(dependsNode)
            }

            let i = 0
            while (i < numDependencies) {
                sortIndexes.push(i)
                ++i
            }

            outDependencies.element = new Array(numDependencies)
            for (const sortIndex of sortIndexes) {
                outDependencies.element?.push(pointerDependencies[sortIndex])
            }

            if (outFlagBits) {
                outFlagBits.element = new BitSet(numFlagBits)
                let writeIndex = 0
                while (writeIndex < numDependencies) {
                    const readIndex = sortIndexes[writeIndex]
                    const start = writeIndex * flagSetWidth
                    let index = 0
                    while (index < (start + flagSetWidth)) {
                        outFlagBits.element?.set(index, inFlagBits?.get(readIndex * flagSetWidth + index))
                        ++index
                    }
                    ++writeIndex
                }
            }
        }

        const packageDependenciesRef = ObjectRef.ref(this.packageDependencies)
        const packageFlagsRef = ObjectRef.ref(this.packageFlags)
        const nameDependenciesRef = ObjectRef.ref(this.nameDependencies)
        const manageDependenciesRef = ObjectRef.ref(this.manageDependencies)
        const manageFlagsRef = ObjectRef.ref(this.manageFlags)
        const referencersRef = ObjectRef.ref(this.referencers)
        readDependencies(packageDependenciesRef, packageFlagsRef, packageFlagSetWidth)
        readDependencies(nameDependenciesRef, null, 0)
        readDependencies(manageDependenciesRef, manageFlagsRef, manageFlagSetWidth)
        readDependencies(referencersRef, null, 0)
        this.packageDependencies = packageDependenciesRef.element
        this.packageFlags = packageFlagsRef.element
        this.nameDependencies = nameDependenciesRef.element
        this.manageDependencies = manageDependenciesRef.element
        this.manageFlags = manageFlagsRef.element
        this.referencers = referencersRef.element
    }

    serializeLoadBeforeFlags(Ar: FArchive, version: FAssetRegistryVersion, preallocatedDependsNodeDataBuffer: FDependsNode[], numDependsNodes: number) {
        this.identifier = new FAssetIdentifier(Ar)

        const numHard = Ar.readInt32()
        const numSoft = Ar.readInt32()
        const numName = Ar.readInt32()
        const numSoftManage = Ar.readInt32()
        const numHardManage = version.version >= Type.AddedHardManage ? Ar.readInt32() : 0
        const numReferencers = Ar.readInt32()

        // Empty dependency arrays and reserve space
        this.packageDependencies = new Array(numHard + numSoft)
        this.nameDependencies = new Array(numName)
        this.manageDependencies = new Array(numSoftManage + numHardManage)
        this.referencers = new Array(numReferencers)

        function serializeNodeArray(num: number, outNodes: ObjectRef<FDependsNode[]>) {
            let i = 0
            while (i < num) {
                const index = Ar.readInt32()
                if (index < 0 || index >= numDependsNodes) {
                    throw new ParserException("Invalid DependencyType index", Ar)
                }
                const dependsNode = preallocatedDependsNodeDataBuffer[index]
                outNodes.element.splice(index, 0, dependsNode)
                ++i
            }
        }

        // Read the bits for each type, but don't write anything if serializing that type isn't allowed
        const packageDependenciesRef = ObjectRef.ref(this.packageDependencies)
        const nameDependenciesRef = ObjectRef.ref(this.nameDependencies)
        const manageDependenciesRef = ObjectRef.ref(this.manageDependencies)
        const referencersRef = ObjectRef.ref(this.referencers)
        serializeNodeArray(numHard, packageDependenciesRef)
        serializeNodeArray(numSoft, packageDependenciesRef)
        serializeNodeArray(numName, nameDependenciesRef)
        serializeNodeArray(numSoftManage, manageDependenciesRef)
        serializeNodeArray(numHardManage, manageDependenciesRef)
        serializeNodeArray(numReferencers, referencersRef)
        this.packageDependencies = packageDependenciesRef.element
        this.nameDependencies = nameDependenciesRef.element
        this.manageDependencies = manageDependenciesRef.element
        this.referencers = referencersRef.element
    }
}