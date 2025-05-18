// import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import TableLayout from "../../../components/ui/table-layout";
import {  UserColumns, UserData } from "../../../data";
import type { IUserType } from "../../../types";
// import type { DocumentsType } from "../../types";

const AdminAllUsersPage = () => {
  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto flex flex-col gap-6">
            <h3 className="text-xl font-semibold">All Users</h3>

            <div className="w-full">
                <TableLayout
                data={UserData}
                columns={UserColumns as ColumnDef<IUserType, unknown>[]} // Replace with actual column definitions
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsersPage;
