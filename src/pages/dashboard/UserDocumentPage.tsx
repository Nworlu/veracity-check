/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { ColumnDef } from "@tanstack/react-table";
import TableLayout from "../../components/ui/table-layout";
import { DocumentsColumns, DocumentsData } from "../../data";
// import type { DocumentsType } from "../../types";
import { useNavigate } from "react-router-dom";
import { useGetUserDocuments } from "../../hook/identity.hook";

const UserDocumentPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserDocuments(true);

  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">User Documents</h3>
            <button
              onClick={() => navigate("/dashboard/upload-document")}
              className="w-fit px-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2.5 rounded-lg shadow transition"
            >
              Upload File
            </button>
          </div>

          <div className="w-full mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#9b87f5] border-opacity-50"></div>
              </div>
            ) : (
              <TableLayout
                data={data || DocumentsData}
                columns={DocumentsColumns as any}
                getRowLink={(row) => `/dashboard/document/${row._id}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDocumentPage;
