import { UDataTable } from "../assets/exports/UDataTable";
import { FName } from "./uobject/FName";
import { UObject } from "../assets/exports/UObject";
import { FTableRowBase } from "./FTableRowBase";

/**
 * FDataTableRowHandle
 */
export class FDataTableRowHandle {
    /**
     * DataTable
     * @type {UDataTable}
     * @public
     */
    public DataTable: UDataTable

    /**
     * RowName
     * @type {FName}
     * @public
     */
    public RowName: FName

    /**
     * Gets row
     * @returns {UObject} Row
     * @public
     */
    public getRow(): UObject {
        if (this.DataTable != null) {
            return this.DataTable.findRow(this.RowName)
        }
        return null
    }

    /**
     * Gets row mapped
     * @returns {FTableRowBase} Row
     * @public
     */
    public getRowMapped<T extends FTableRowBase>(): T {
        if (this.DataTable != null) {
            return this.DataTable.findRowMapped(this.RowName)
        }
        return null
    }
}