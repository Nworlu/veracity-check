// pages/UploadDocument.tsx
import { useState } from "react";
import { useCloudinaryUpload } from "../../hook/useCloudinary";
import { useUploadDocumentsMutation } from "../../hook/identity.hook";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //   const [docName, setDocName] = useState("");
  const { uploadFile, uploading, uploadUrl, uploadError } =
    useCloudinaryUpload();
  const uploadDocumentMutation = useUploadDocumentsMutation();
  const { user, walletAddress } = useAuth();
  const [documentType, setDocumentType] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  console.log({ documentType });

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please provide both a document name and file.");
      return;
    }

    const url = await uploadFile(selectedFile);
    if (!url) return;

    uploadDocumentMutation.mutate(
      {
        fullName: `${user?.firstname} ${user?.lastname}`,
        documentFileUrl: url,
        documentType,
        documentNumber: Math.random().toString(36).substring(2, 15),
        dateOfBirth: "1990-01-01",
        nationality: "Nigerian",
        blockchainHash: walletAddress as string,
        rejectionReason: "none",
      },
      {
        onSuccess: () => {
          setIsVerifying(true);
          setShowSuccess(false);

          setTimeout(() => {
            setIsVerifying(false);
            setShowSuccess(true);

            // ✅ Redirect to homepage after 1 more second (optional delay)
            setTimeout(() => {
              navigate("/dashboard/documents");
            }, 1000);
          }, 4000); // 4 seconds delay
        },
      }
    );
  };

  if (isVerifying) {
    return (
      <p className="text-blue-600 text-sm mt-2 animate-pulse text-center">
        ⏳ Verifying...
      </p>
    );
  }

  if (showSuccess) {
    return (
      <p className="text-green-600 text-sm mt-2 animate-pulse text-center">
        ✅ Document uploaded successfully!
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📁 Upload Document
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter document name"
            value={selectedFile?.name}
            // onChange={(e) => setDocName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg,.gif,.webp"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              cursor-pointer"
          />

          {selectedFile && (
            <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
              <strong>File:</strong> {selectedFile.name} <br />
              <strong>Type:</strong> {selectedFile.type}
            </div>
          )}

          <div>
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700"
            >
              Document Type
            </label>
            <select
              id="documentType"
              name="documentType"
              required
              defaultValue=""
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
            >
              <option value="" disabled>
                Select Document Type
              </option>
              <option value="passport">Passport</option>
              <option value="national_id">National Id</option>
              <option value="driver_license">Driver License</option>
            </select>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {uploading || uploadDocumentMutation.isPending
              ? "Uploading..."
              : "Upload Document"}
          </button>

          {uploadError && (
            <p className="text-red-600 text-sm mt-2">❌ {uploadError}</p>
          )}

          {uploadUrl ||
            (uploadDocumentMutation.data && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Uploaded!{" "}
                <a
                  href={uploadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-purple-700"
                >
                  View Document
                </a>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
