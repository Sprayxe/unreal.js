export declare class Config implements IConfig {
    static GExportArchiveCheckDummyName: boolean;
    static GDebugProperties: boolean;
    static GFatalUnknownProperty: boolean;
    static GSuppressMissingSchemaErrors: boolean;
}
export interface IConfig {
    /**
     * Whether to check dummy names in export archive
     * @type {boolean}
     * @default false
     */
    GExportArchiveCheckDummyName?: boolean;
    /**
     * Whether to debug properties
     * @type {boolean}
     * @default false
     */
    GDebugProperties?: boolean;
    /**
     * Whether it is fatal if a property couldn't be deserialized
     * @type {boolean}
     * @default false
     */
    GFatalUnknownProperty?: boolean;
    /**
     * Whether to supress missing schema errors
     * @type {boolean}
     * @default false
     */
    GSuppressMissingSchemaErrors?: boolean;
}
