export class Config implements IConfig {
    public static GExportArchiveCheckDummyName: boolean
    public static GDebug: boolean
    public static GFatalUnknownProperty: boolean
    public static GSuppressMissingSchemaErrors: boolean
    public static GUseLocalTypeRegistry: boolean
}

export interface IConfig {
    /**
     * Whether to check dummy names in export archive
     * @type {boolean}
     * @default false
     */
    GExportArchiveCheckDummyName?: boolean

    /**
     * Whether to debug
     * @type {boolean}
     * @default false
     */
    GDebug?: boolean

    /**
     * Whether it is fatal if a property couldn't be deserialized
     * @type {boolean}
     * @default false
     */
    GFatalUnknownProperty?: boolean

    /**
     * Whether to suppress missing schema errors
     * @type {boolean}
     * @default false
     */
    GSuppressMissingSchemaErrors?: boolean

    /**
     * Whether to use 'process.cwd()' instead of 'process.cwd() + /node_modules/unreal.js' for object type registry
     * Do not set this to true unless you are not using unreal.js via node_modules
     * @type {boolean}
     * @default false
     */
    GUseLocalTypeRegistry?: boolean
}

