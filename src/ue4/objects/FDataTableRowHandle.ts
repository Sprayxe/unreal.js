import { UDataTable } from "../assets/exports/UDataTable";
import { FName } from "./uobject/FName";
import { UObject } from "../assets/exports/UObject";
import { FTableRowBase } from "./FTableRowBase";

export class FDataTableRowHandle {
    public DataTable: UDataTable
    public RowName: FName

    public getRow(): UObject {
        if (this.DataTable != null) {
            return this.DataTable.findRow(this.RowName);
        }
        return null;
    }

    public getRowMapped<T extends FTableRowBase>(): T {
        if (this.DataTable != null) {
            return this.DataTable.findRowMapped(this.RowName);
        }
        return null;
    }
}