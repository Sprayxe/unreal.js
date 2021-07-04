import { FIoDispatcherMountedContainer, FOnContainerMountedListener } from "../io/IoDispatcher";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FNameMap } from "./FNameMap";
import { FPackageObjectIndex, FPackageStoreEntry, FScriptObjectEntry } from "./AsyncLoading2";
import { UnrealMap } from "../../util/UnrealMap";
import Collection from "@discordjs/collection";
/**
 * FPackageStore (I/O)
 * @extends {FOnContainerMountedListener}
 */
export declare class FPackageStore extends FOnContainerMountedListener {
    /**
     * Provider
     * @type {FileProvider}
     * @public
     */
    provider: FileProvider;
    /**
     * Global name map
     * @type {FNameMap}
     * @public
     */
    globalNameMap: FNameMap;
    /**
     * Creates instance using values
     * @param {FileProvider} provider File provider to use
     * @param {FNameMap} globalNameMap Global name map to use
     */
    constructor(provider: FileProvider, globalNameMap: FNameMap);
    /**
     * Loaded containers
     * @type {Collection<bigint, FLoadedContainer>}
     * @public
     */
    loadedContainers: Collection<bigint, FLoadedContainer>;
    /**
     * Current culture names
     * @type {Array<string>}
     * @public
     */
    currentCultureNames: string[];
    /**
     * Store entries
     * @type {Collection<bigint, FPackageStoreEntry>}
     * @public
     */
    storeEntries: Collection<bigint, FPackageStoreEntry>;
    /**
     * Redirected packages
     * @type {Collection<bigint, FPackageStoreEntry>}
     * @public
     */
    redirectedPackages: Collection<bigint, bigint>;
    /**
     * Script object entries
     * @type {Array<FScriptObjectEntry>}
     * @public
     */
    scriptObjectEntries: FScriptObjectEntry[];
    /**
     * Script object entries map
     * @type {UnrealMap<FPackageObjectIndex, FScriptObjectEntry>}
     * @public
     */
    scriptObjectEntriesMap: UnrealMap<FPackageObjectIndex, FScriptObjectEntry>;
    /**
     * Sets up culture
     * @returns {void}
     * @public
     */
    setupCulture(): void;
    /**
     * Sets up initial load data
     * @returns {void}
     * @public
     */
    setupInitialLoadData(): void;
    /**
     * Loads containers
     * @param {Array<FIoDispatcherMountedContainer>} containers Containers to load
     * @returns {void}
     * @public
     */
    loadContainers(containers: FIoDispatcherMountedContainer[]): void;
    /**
     * On container mounted 'event'
     * @param {FIoDispatcherMountedContainer} container Container to call
     * @returns {void}
     * @public
     */
    onContainerMounted(container: FIoDispatcherMountedContainer): void;
    /**
     * Applies store redirects
     * @param {UnrealMap<bigint, bigint>} redirects Redirects to apply
     * @returns {void}
     * @public
     */
    applyRedirects(redirects: UnrealMap<bigint, bigint>): void;
    /**
     * Gets an store entry
     * @param {bigint} packageId ID of store entry to get
     * @returns {FPackageStoreEntry}
     * @public
     */
    findStoreEntry(packageId: bigint): FPackageStoreEntry;
    /**
     * Gets redirected package id
     * @param {bigint} packageId ID of redirect to get
     * @returns {Collection<bigint, bigint>}
     * @public
     */
    getRedirectedPackageId(packageId: bigint): bigint;
}
/**
 * FLoadedContainer
 */
export declare class FLoadedContainer {
    /**
     * Container name map
     * @type {FNameMap}
     * @public
     */
    containerNameMap: FNameMap;
    /**
     * Store entries
     * @type {Array<FPackageStoreEntry>}
     * @public
     */
    storeEntries: FPackageStoreEntry[];
    /**
     * Package count
     * @type {number}
     * @public
     */
    packageCount: number;
    /**
     * Order
     * @type {number}
     * @public
     */
    order: number;
    /**
     * bValid
     * @type {boolean}
     * @public
     */
    bValid: boolean;
}
