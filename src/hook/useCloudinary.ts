/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCloudinaryUpload.ts
import axios from "axios";
import { useState } from "react";

const CLOUD_NAME = "deqfgp7hg";
const UPLOAD_PRESET = "b5ct6uia"; // Ensure this is an unsigned preset

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setUploadUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { secure_url } = response.data;
      if (secure_url) {
        setUploadUrl(secure_url);
        return secure_url;
      } else {
        throw new Error("Upload failed: No URL returned");
      }
    } catch (err: any) {
      setUploadError(err.response?.data?.error?.message || err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, uploadError, uploadUrl };
};
