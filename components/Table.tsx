import { useEffect, useState } from "react";
import {
  AgGridReact as AgGrid,
  AgGridColumnProps as TCol
} from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

type TData = Record<string | symbol, any>;

interface IProps {
  data?: TData[];
  /**
   * if set to `true` or `false` it affects all columns
   */
  sortable?: boolean | (keyof IProps["data"])[];
  /**
   * if set to `true` or `false` it affects all columns
   */
  filterable?: IProps["sortable"];
}

export default function Table({ data, filterable, sortable }: IProps) {
  const [cols, setCols] = useState<TCol[]>([]);

  useEffect(
    function setColumnsDefs() {
      const allColumns = data?.flatMap(obj => Object.keys(obj));
      const uniqueColumns = new Set(allColumns ?? []);
      const fields: TCol[] = Array.from(uniqueColumns).map(field => ({
        headerName: field.replace("_", " "),
        headerClass: "capitalize",
        field,
        cellClass: ({ value }) => {
          if (typeof value === "number") {
            return "text-right";
          }
        }
      }));
      setCols(fields);
    },
    [data]
  );

  useEffect(
    function setSortableColumns() {
      if (sortable === undefined || !cols.length) return;
      const col = cols[0];
      if (col.sortable !== undefined) return;
      let updatedCols: typeof cols;
      if (typeof sortable === "boolean") {
        updatedCols = cols.map(col => ({
          ...col,
          sortable
        }));
      } else {
        updatedCols = cols.map(col => ({
          ...col,
          sortable: sortable.some(value => String(value) === col["field"])
        }));
      }
      setCols(updatedCols);
    },
    [cols, sortable]
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: 600
      }}
    >
      <AgGrid rowData={data} columnDefs={cols} />
    </div>
  );
}
