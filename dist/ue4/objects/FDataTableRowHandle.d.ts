import { UDataTable } from "../assets/exports/UDataTable";
import { FName } from "./uobject/FName";
import { UObject } from "../assets/exports/UObject";
import { FTableRowBase } from "./FTableRowBase";
/**
 * FDataTableRowHandle
 */
export declare class FDataTableRowHandle {
    /**
     * DataTable
     * @type {UDataTable}
     * @public
     */
    DataTable: UDataTable;
    /**
     * RowName
     * @type {FName}
     * @public
     */
    RowName: FName;
    /**
     * Gets row
     * @returns {UObject} Row
     * @public
     */
    getRow(): UObject;
    /**
     * Gets row mapped
     * @returns {FTableRowBase} Row
     * @public
     */
    getRowMapped<T extends FTableRowBase>(): T;
}
