export declare class ObjectRef<T> {
    element: T;
    constructor(element?: T);
    static ref<T>(element: T): ObjectRef<T>;
}
export declare type FloatRef = ObjectRef<number>;
export declare type IntRef = ObjectRef<number>;
