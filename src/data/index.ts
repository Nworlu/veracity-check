import { ClipboardMinus, User, Users } from "lucide-react";
import type { DocumentsType, IUserType } from "../types";
import { createColumnHelper } from "@tanstack/react-table";
export const documentColumnHelper = createColumnHelper<DocumentsType>();
export const userColumnHelper = createColumnHelper<IUserType>();

export const links = [
  {
    id: 1,
    name: "Documents",
    href: "/dashboard/documents",
    Icon: ClipboardMinus,
  },
  {
    id: 2,
    name: "All Documents",
    href: "/dashboard/admin-documents",
    Icon: ClipboardMinus,
  },
  {
    id: 3,
    name: "Users",
    href: "/dashboard/admin-users",
    Icon: Users,
  },
  {
    id: 4,
    name: "Profile",
    href: "/dashboard/profile",
    Icon: User,
  },
];

export const DocumentsData: DocumentsType[] = [
  {
    id: 1,
    fileName: "Document 1",
    fileSize: "2.5 MB",
    fileType: "PDF",
    uploadDate: "2023-10-01",
    status: "Verified",
    verificationDate: "2023-10-02",
    verificationStatus: "Verified",
  },
  {
    id: 2,
    fileName: "Document 1",
    fileSize: "2.5 MB",
    fileType: "PDF",
    uploadDate: "2023-10-01",
    status: "Verified",
    verificationDate: "2023-10-02",
    verificationStatus: "Verified",
  },
];

export const DocumentsColumns = [
  documentColumnHelper.accessor("fullName", {
    header: "Upload By",
    cell: (info) => info.getValue(),
  }),
//   documentColumnHelper.accessor("fileSize", {
//     header: "File Size",
//     cell: (info) => info.getValue(),
//   }),
  documentColumnHelper.accessor("documentType", {
    header: "Document Type",
    cell: (info) => info.getValue(),
  }),
  documentColumnHelper.accessor("createdAt", {
    header: "Upload Date",
    cell: (info) => info.getValue()?.split("T")[0],
  }),
  documentColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  documentColumnHelper.accessor("updatedAt", {
    header: "Verification Date",
    cell: (info) => info.getValue()?.split("T")[0],
  }),
  documentColumnHelper.accessor("status", {
    header: "Verification Status",
    cell: (info) => info.getValue(),
  }),
];


export const UserData: IUserType[] = [
  {
    id: 1,
firstName:"John",
    lastName: "Doe",
    email: "johndoe@gmail.com"
  },
  {
    id: 2,
firstName:"John",
    lastName: "Doe",
    email: "johndoe@gmail.com"
  },

];

export const UserColumns = [
  userColumnHelper.accessor("firstname", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.accessor("lastname", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),

];
