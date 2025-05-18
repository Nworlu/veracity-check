import React, { useRef, useState } from "react";
import { Upload, FileCheck, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/Button";

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  status: "pending" | "verifying" | "verified" | "failed";
};

const Verify = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [verifyingIndex, setVerifyingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: UploadedFile[] = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      status: "pending",
    }));
    setUploadedFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const startVerification = (index: number) => {
    setVerifyingIndex(index);
    setUploadedFiles((prev) =>
      prev.map((file, idx) =>
        idx === index ? { ...file, status: "verifying" } : file
      )
    );
    // Mock "verification" delay and result
    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((file, idx) =>
          idx === index
            ? {
                ...file,
                status: Math.random() > 0.2 ? "verified" : "failed",
              }
            : file
        )
      );
      setVerifyingIndex(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-2 bg-gradient-to-tr from-[#E5DEFF] via-[#f6f6f7] to-[#7E69AB]">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Upload className="mb-2 text-[##7E69AB]" size={44} />
            <CardTitle className="text-center text-2xl md:text-3xl">
              Document Verifier
            </CardTitle>
            <p className="text-gray-500 text-sm mt-1">
              Upload your documents below to verify their authenticity locally.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                multiple
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex gap-2 text-base"
              >
                <Upload size={20} /> Select Files
              </Button>
              {uploadedFiles.length > 0 ? (
                <div className="mt-7 w-full space-y-4">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={file.name + file.lastModified}
                      className="flex items-center justify-between border rounded-lg px-3 py-2 bg-white shadow"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-[#9b87f5]" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-xs text-gray-400">
                            {file.type || "Unknown type"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold ${
                            file.status === "verified"
                              ? "text-green-600"
                              : file.status === "failed"
                              ? "text-red-500"
                              : file.status === "verifying"
                              ? "text-blue-500 animate-pulse"
                              : "text-gray-500"
                          }`}
                        >
                          {file.status === "pending" && "Pending"}
                          {file.status === "verifying" && "Verifying..."}
                          {file.status === "verified" && (
                            <>
                              <FileCheck className="inline mr-1" size={16} />
                              Verified
                            </>
                          )}
                          {file.status === "failed" && "Verification Failed"}
                        </span>
                        {file.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => startVerification(idx)}
                            disabled={verifyingIndex !== null}
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 mt-7 text-center">
                  No documents uploaded yet.
                  <br />
                  Click 'Select Files' to upload.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Verify;
