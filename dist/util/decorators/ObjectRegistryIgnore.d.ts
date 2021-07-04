export declare function ObjectRegistryIgnore<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
    ObjectRegistryIgnore: boolean;
} & T;
