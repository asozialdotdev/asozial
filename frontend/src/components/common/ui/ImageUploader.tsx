"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadFile } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";
import { SquareCheckBig, Upload } from "lucide-react";
import LoadingTextButton from "./LoadingTextButton";
import ErrorMessage from "./ErrorMessage";

export type ImageT = {
  url: string;
  placeholder: string;
  message: string;
};

type ImageUploaderProps = {
  className?: string;
  variant?:
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "outline"
    | "link";
  onUploadSucess?: (image: ImageT) => void;
  edit?: boolean;
};

export default function ImageUploader({
  className,
  variant = "outline",
  onUploadSucess,
  edit,
}: ImageUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<ImageT | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
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
        setSuccess(true);
        if (onUploadSucess) {
          onUploadSucess(result);
        }
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-4">
      <Input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        type="button"
        name="image"
        variant={variant}
        disabled={isLoading}
        onClick={handleButtonClick}
        className={cn(className)}
      >
        {isLoading ? (
          <LoadingTextButton text="Please wait" />
        ) : !success ? (
          <span className="flex items-center gap-3">
            <Upload />
            <span>{!edit ? "Upload an image" : "Update image"}</span>
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <SquareCheckBig />
            <span>{!edit ? "Image uploaded" : "Image updated"}</span>
          </span>
        )}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
