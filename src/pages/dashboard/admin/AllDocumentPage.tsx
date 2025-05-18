/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createColumnHelper } from "@tanstack/react-table";
// import type { ColumnDef } from "@tanstack/react-table";
import TableLayout from "../../../components/ui/table-layout";
import { DocumentsColumns } from "../../../data";
// import type { DocumentsType } from "../../../types";
import { useGetAllAdminDocuments } from "../../../hook/admin.hook";
// import type { DocumentsType } from "../../types";

const AdminAllDocumentsPage = () => {
    const { data, isLoading } = useGetAllAdminDocuments(true);

  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
            <h3 className="text-xl font-semibold">All Documents</h3>

            <div className="w-full">
            {isLoading ? 
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#9b87f5] border-opacity-50"></div>
              </div>
              :
                <TableLayout
                data={data}
                columns={DocumentsColumns as any} // Replace with actual column definitions
                getRowLink={(row) => `/dashboard/document/${row._id}`}

                />
            }
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllDocumentsPage;
