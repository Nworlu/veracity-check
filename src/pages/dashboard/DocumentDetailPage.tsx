import { useParams } from "react-router-dom";
import { useGetUserSingleDocument } from "../../hook/identity.hook";
import { useVerifyIdentityMutation } from "../../hook/admin.hook";
import { useAuth } from "../../context/AuthProvider";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetUserSingleDocument(id as string);
  const { user } = useAuth()
  console.log({ id });

  // Temporary hardcoded document, replace with `data` from API when ready
  const document = {
    title: "Verification Report - User ID",
    uploadedBy: "Jane Doe",
    uploadedAt: "July 21, 2025",
    description:
      "This is a detailed verification document outlining the authenticity of the supplied credentials and compliance with system requirements.",
    status: "Verified",
    fileUrl: "/example.pdf",
  };
  const verifyIdentityMutation =useVerifyIdentityMutation()

  const handleVerify = (status:"approved" | "rejected") => {
    verifyIdentityMutation.mutateAsync({
      body:status,
      id: data._id,
    }).then(() => {
      refetch()
    })
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{document.title} {data?._user?.slice(0,7)}......</h1>
        <p className="text-sm text-gray-500 mt-1">
          Uploaded by <span className="font-medium">{data.fullName}</span> on{" "}
          {data.createdAt?.split("T")[0]}{" "}
        </p>
      </div>

      <div className="mb-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            data.status === "approved"
              ? "bg-green-100 text-green-700"
              : data.status === "pending"? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Document Type
        </h2>
        <p className="text-gray-600 leading-relaxed capitalize">{data.documentType}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
        User BlockChain Hash
        </h2>
        <p className="text-gray-600 leading-relaxed capitalize">{data.blockchainHash}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Document File
        </h2>
        <a
          href={data.documentFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          View Document
        </a>
      </div>

{user?.userType === "admin" && 
      <div className="flex gap-4 mt-8">
        <button disabled={verifyIdentityMutation.isPending} onClick={()=> handleVerify('approved')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
         {verifyIdentityMutation.isPending ? "Verifying...." : "Approve"}
        </button>
        <button disabled={verifyIdentityMutation.isPending} onClick={()=> handleVerify('rejected')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
         {verifyIdentityMutation.isPending ? "Rejecting...." : "Reject"}
        </button>
       
      </div>

}
    </div>
  );
};

export default DocumentDetailPage;
