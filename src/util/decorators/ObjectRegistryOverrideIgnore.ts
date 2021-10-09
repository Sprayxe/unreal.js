export function ObjectRegistryOverrideIgnore<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        static ObjectRegistryIgnore = false
    }
}