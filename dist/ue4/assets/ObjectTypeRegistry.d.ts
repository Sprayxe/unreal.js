export declare class ObjectTypeRegistry {
    static registry: {};
    static init(): Promise<void>;
    private static registerEngine;
    private static registerFortnite;
    private static registerValorant;
    static register(clazz: any): any;
    static register(serializedName: string, clazz: any): any;
    static get(name: string): any;
    static unprefix(str: string, includeF?: boolean): string;
}
