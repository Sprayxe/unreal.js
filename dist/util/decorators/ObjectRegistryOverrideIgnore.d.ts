export declare function ObjectRegistryOverrideIgnore<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
    ObjectRegistryIgnore: boolean;
} & T;
