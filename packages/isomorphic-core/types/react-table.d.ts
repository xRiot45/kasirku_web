import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    handleDeleteRow?: (row: Row<TData>) => void;
    handleMultipleDelete?: (row: Row<TData>) => void;
    handleResetPasswordRow?: (row: Row<TData>) => void;
    handleConfirmedRow?: (row: Row<TData>) => void;
    handleProcessedRow?: (row: Row<TData>) => void;
    handleCompletedRow?: (row: Row<TData>) => void;
    handleCancelledRow?: (row: Row<TData>) => void;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    isColumnDraggable?: boolean;
  }
}
