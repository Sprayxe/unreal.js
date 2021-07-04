export declare class Lazy<T> {
    private initializer;
    private _value;
    constructor(initializer: () => T);
    get value(): T;
    get isInitialized(): boolean;
}
