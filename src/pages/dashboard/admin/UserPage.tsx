/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createColumnHelper } from "@tanstack/react-table";
// import type { ColumnDef } from "@tanstack/react-table";
import TableLayout from "../../../components/ui/table-layout";
import {  UserColumns } from "../../../data";
// import type { IUserType } from "../../../types";
import { useGetAllAdminUser } from "../../../hook/admin.hook";
// import type { DocumentsType } from "../../types";

const AdminAllUsersPage = () => {
    const { data, isLoading } = useGetAllAdminUser(true);

    console.log({data}, "getAllAdminUserService");

  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
            <h3 className="text-xl font-semibold">All Users</h3>

            <div className="w-full">
            {isLoading ? 
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#9b87f5] border-opacity-50"></div>
              </div>
              :
                <TableLayout
                data={data}
                columns={UserColumns as any} // Replace with actual column definitions
                />
            }
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsersPage;
