"use client";

import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Image from "next/image";
import { uploadFile } from "@/actions";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("imageUrl", selectedFile);

    const result = await uploadFile(formData);
    if (result.error) {
      setError(result.message);
      setIsLoading(false);
    } else {
      setUploadedFile(result);
      setIsLoading(false);
      console.log("File uploaded in client", result);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Upload a File</h3>
      <Input
        type="file"
        onChange={handleFileChange}
        className="mt-2 block w-full"
      />
      <Button
        onClick={handleFileUpload}
        className="h-12 w-full border-zinc-300 bg-white text-dark hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
      >
        Upload
      </Button>

      {isLoading && <p className="mt-2">Uploading...</p>}

      {uploadedFile && (
        <div className="mt-4">
          {/* <Image
            src={uploadedFile.url}
            width={200}
            height={200}
            alt="uploaded file"
            className="h-24 w-24"
          /> */}
          FILE UPLOADED
        </div>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
