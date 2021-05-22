export function ObjectRegistryIgnore<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        static ObjectRegistryIgnore = true
    }
}