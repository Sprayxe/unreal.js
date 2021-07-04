"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLoadedContainer = exports.FPackageStore = void 0;
const IoDispatcher_1 = require("../io/IoDispatcher");
const FNameMap_1 = require("./FNameMap");
const AsyncLoading2_1 = require("./AsyncLoading2");
const os_locale_1 = __importDefault(require("os-locale"));
const FByteArchive_1 = require("../reader/FByteArchive");
const Exceptions_1 = require("../../exceptions/Exceptions");
const UnrealMap_1 = require("../../util/UnrealMap");
const collection_1 = __importDefault(require("@discordjs/collection"));
/**
 * FPackageStore (I/O)
 * @extends {FOnContainerMountedListener}
 */
class FPackageStore extends IoDispatcher_1.FOnContainerMountedListener {
    /**
     * Creates instance using values
     * @param {FileProvider} provider File provider to use
     * @param {FNameMap} globalNameMap Global name map to use
     */
    constructor(provider, globalNameMap) {
        super();
        /**
         * Loaded containers
         * @type {Collection<bigint, FLoadedContainer>}
         * @public
         */
        this.loadedContainers = new collection_1.default();
        /**
         * Current culture names
         * @type {Array<string>}
         * @public
         */
        this.currentCultureNames = [];
        /**
         * Store entries
         * @type {Collection<bigint, FPackageStoreEntry>}
         * @public
         */
        this.storeEntries = new collection_1.default();
        /**
         * Redirected packages
         * @type {Collection<bigint, FPackageStoreEntry>}
         * @public
         */
        this.redirectedPackages = new collection_1.default();
        /**
         * Script object entries
         * @type {Array<FScriptObjectEntry>}
         * @public
         */
        this.scriptObjectEntries = [];
        /**
         * Script object entries map
         * @type {UnrealMap<FPackageObjectIndex, FScriptObjectEntry>}
         * @public
         */
        this.scriptObjectEntriesMap = new UnrealMap_1.UnrealMap();
        this.provider = provider;
        this.globalNameMap = globalNameMap;
    }
    /**
     * Sets up culture
     * @returns {void}
     * @public
     */
    setupCulture() {
        this.currentCultureNames = [];
        this.currentCultureNames.push(os_locale_1.default.sync().toString().replace("_", "-"));
    }
    /**
     * Sets up initial load data
     * @returns {void}
     * @public
     */
    setupInitialLoadData() {
        const initialLoadIoBuffer = this.provider.saveChunk(IoDispatcher_1.createIoChunkId(0n, 0, IoDispatcher_1.EIoChunkType.LoaderInitialLoadMeta));
        const initialLoadArchive = new FByteArchive_1.FByteArchive(initialLoadIoBuffer);
        const numScriptObjects = initialLoadArchive.readInt32();
        for (let i = 0; i < numScriptObjects; ++i) {
            const obj = new AsyncLoading2_1.FScriptObjectEntry(initialLoadArchive, this.globalNameMap.nameEntries);
            const mappedName = AsyncLoading2_1.FMappedName.fromMinimalName(obj.objectName);
            if (!mappedName.isGlobal())
                throw new Exceptions_1.ParserException("FMappedName must be global", initialLoadArchive);
            obj.objectName = this.globalNameMap.getMinimalName(mappedName);
            this.scriptObjectEntriesMap.set(obj.globalIndex, obj);
            this.scriptObjectEntries.push(obj);
        }
    }
    /**
     * Loads containers
     * @param {Array<FIoDispatcherMountedContainer>} containers Containers to load
     * @returns {void}
     * @public
     */
    loadContainers(containers) {
        const invalidId = 0xffffffffffffffffn;
        const containersToLoad = containers.filter(it => it.containerId !== invalidId);
        if (!containersToLoad.length)
            return;
        const start = Date.now();
        console.log(`Loading ${containersToLoad.length} mounted containers...`);
        for (const container of containersToLoad) {
            const containerId = container.containerId;
            let loadedContainer = this.loadedContainers.get(containerId);
            if (!loadedContainer) {
                const cont = new FLoadedContainer();
                this.loadedContainers.set(containerId, cont);
                loadedContainer = cont;
            }
            if (loadedContainer.bValid && loadedContainer.order >= container.environment.order) {
                console.debug(`Skipping loading mounted container ID '${containerId}', already loaded with higher order`);
                continue;
            }
            loadedContainer.bValid = true;
            loadedContainer.order = container.environment.order;
            const headerChunkId = IoDispatcher_1.createIoChunkId(containerId, 0, IoDispatcher_1.EIoChunkType.ContainerHeader);
            const ioBuffer = this.provider.saveChunk(headerChunkId);
            const containerHeader = new AsyncLoading2_1.FContainerHeader(new FByteArchive_1.FByteArchive(ioBuffer));
            const bHasContainerLocalNameMap = !!containerHeader.names;
            if (bHasContainerLocalNameMap) {
                loadedContainer.containerNameMap.load(containerHeader.names, containerHeader.nameHashes, AsyncLoading2_1.FMappedName_EType.Container);
            }
            loadedContainer.packageCount = containerHeader.packageCount;
            loadedContainer.storeEntries = containerHeader.storeEntries;
            for (const index in loadedContainer.storeEntries) {
                this.storeEntries.set(containerHeader.packageIds[index], loadedContainer.storeEntries[index]);
            }
            let localizedPackages = null;
            for (const cultureName of this.currentCultureNames) {
                localizedPackages = containerHeader.culturePackageMap.get(cultureName);
                if (localizedPackages)
                    break;
            }
            if (localizedPackages) {
                for (const pair of localizedPackages) {
                    this.redirectedPackages.set(pair.key, pair.value);
                }
            }
            for (const redirect of containerHeader.packageRedirects) {
                this.redirectedPackages.set(redirect.key, redirect.value);
            }
        }
        this.applyRedirects(this.redirectedPackages);
        console.log(`Loaded mounted containers in ${Date.now() - start}ms!`);
    }
    /**
     * On container mounted 'event'
     * @param {FIoDispatcherMountedContainer} container Container to call
     * @returns {void}
     * @public
     */
    onContainerMounted(container) {
        this.loadContainers([container]);
    }
    /**
     * Applies store redirects
     * @param {UnrealMap<bigint, bigint>} redirects Redirects to apply
     * @returns {void}
     * @public
     */
    applyRedirects(redirects) {
        if (!redirects.size)
            return;
        for (const [sourceId, redirectId] of redirects) {
            if (redirectId === 0xffffffffffffffffn)
                throw new Error("Redirect must be valid");
            this.storeEntries.set(sourceId, this.storeEntries.get(redirectId));
        }
        for (const storeEntry of this.storeEntries.values()) {
            storeEntry.importedPackages.forEach((importedPackageId, index) => {
                storeEntry.importedPackages[index] = redirects[importedPackageId];
            });
        }
    }
    /**
     * Gets an store entry
     * @param {bigint} packageId ID of store entry to get
     * @returns {FPackageStoreEntry}
     * @public
     */
    findStoreEntry(packageId) {
        return this.storeEntries.get(packageId);
    }
    /**
     * Gets redirected package id
     * @param {bigint} packageId ID of redirect to get
     * @returns {Collection<bigint, bigint>}
     * @public
     */
    getRedirectedPackageId(packageId) {
        return this.redirectedPackages.get(packageId);
    }
}
exports.FPackageStore = FPackageStore;
/**
 * FLoadedContainer
 */
class FLoadedContainer {
    constructor() {
        /**
         * Container name map
         * @type {FNameMap}
         * @public
         */
        this.containerNameMap = new FNameMap_1.FNameMap();
        /**
         * Store entries
         * @type {Array<FPackageStoreEntry>}
         * @public
         */
        this.storeEntries = [];
        /**
         * Package count
         * @type {number}
         * @public
         */
        this.packageCount = 0;
        /**
         * Order
         * @type {number}
         * @public
         */
        this.order = 0;
        /**
         * bValid
         * @type {boolean}
         * @public
         */
        this.bValid = false;
    }
}
exports.FLoadedContainer = FLoadedContainer;
