export class Config implements IConfig {
    public static GExportArchiveCheckDummyName: boolean = false
    public static GDebugProperties: boolean = false
    public static GFatalUnknownProperty: boolean = false
    public static GSuppressMissingSchemaErrors: boolean = false
}

export interface IConfig {
    /**
     * Whether to check dummy names in export archive
     * @type {boolean}
     * @default false
     */
    GExportArchiveCheckDummyName?: boolean

    /**
     * Whether to debug properties
     * @type {boolean}
     * @default false
     */
    GDebugProperties?: boolean

    /**
     * Whether it is fatal if a property couldn't be deserialized
     * @type {boolean}
     * @default false
     */
    GFatalUnknownProperty?: boolean

    /**
     * Whether to supress missing schema errors
     * @type {boolean}
     * @default false
     */
    GSuppressMissingSchemaErrors?: boolean
}

