// import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import TableLayout from "../../../components/ui/table-layout";
import { DocumentsColumns, DocumentsData } from "../../../data";
import type { DocumentsType } from "../../../types";
// import type { DocumentsType } from "../../types";

const AdminAllDocumentsPage = () => {
  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
            <h3 className="text-xl font-semibold">All Documents</h3>

            <div className="w-full">
                <TableLayout
                data={DocumentsData}
                columns={DocumentsColumns as ColumnDef<DocumentsType, unknown>[]} // Replace with actual column definitions
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllDocumentsPage;
