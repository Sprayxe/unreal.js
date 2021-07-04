"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FDataTableRowHandle = void 0;
/**
 * FDataTableRowHandle
 */
class FDataTableRowHandle {
    /**
     * Gets row
     * @returns {UObject} Row
     * @public
     */
    getRow() {
        if (this.DataTable != null) {
            return this.DataTable.findRow(this.RowName);
        }
        return null;
    }
    /**
     * Gets row mapped
     * @returns {FTableRowBase} Row
     * @public
     */
    getRowMapped() {
        if (this.DataTable != null) {
            return this.DataTable.findRowMapped(this.RowName);
        }
        return null;
    }
}
exports.FDataTableRowHandle = FDataTableRowHandle;
