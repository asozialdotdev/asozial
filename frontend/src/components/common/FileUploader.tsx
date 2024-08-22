"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("imageUrl", selectedFile);

    try {
      const response = await fetch("http://localhost:5005/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      console.log("File uploaded:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
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
        className="h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
      >
        Upload
      </Button>
    </div>
  );
}
