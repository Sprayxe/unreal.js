export declare class StringBuilder {
    value: any[];
    constructor(value?: any);
    append(value: string, offset?: number, length?: number): this;
    toString(): string;
    get length(): number;
}
