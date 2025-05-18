import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
  } from "@tanstack/react-table";
  import { useNavigate } from "react-router-dom";
  
  type TableLayoutProps<T extends { id: string | number }> = {
    data: T[];
    columns: ColumnDef<T, unknown>[];
    getRowLink?: (row: T) => string; // Optional dynamic route function
  };
  
  const TableLayout = <T extends { id: string | number }>({
    data,
    columns,
    getRowLink,
  }: TableLayoutProps<T>) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    const navigate = useNavigate();
  
    return (
      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm text-left bg-white">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map((row) => {
              const rowData = row.original;
              const link = getRowLink?.(rowData);
  
              return (
                <tr
                  key={row.id}
                  className={`transition-colors duration-200 ${
                    link ? "hover:bg-slate-50 cursor-pointer" : ""
                  }`}
                  onClick={() => link && navigate(link)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-slate-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableLayout;
  