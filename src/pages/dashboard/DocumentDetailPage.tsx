
const DocumentDetailPage = () => {
  const document = {
    title: "Verification Report - User ID #123456",
    uploadedBy: "Jane Doe",
    uploadedAt: "July 21, 2025",
    description:
      "This is a detailed verification document outlining the authenticity of the supplied credentials and compliance with system requirements.",
    status: "Verified",
    fileUrl: "/example.pdf",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{document.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Uploaded by <span className="font-medium">{document.uploadedBy}</span> on {document.uploadedAt}
        </p>
      </div>

      <div className="mb-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            document.status === "Verified"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {document.status}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
        <p className="text-gray-600 leading-relaxed">{document.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Document File</h2>
        <a
          href={document.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          View Document
        </a>
      </div>

      <div className="flex gap-4 mt-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
