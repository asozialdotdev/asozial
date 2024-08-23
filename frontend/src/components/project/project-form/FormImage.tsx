import ImageUploader, { ImageT } from "@/components/common/ui/ImageUploader";
import CustomLabel from "@/components/common/ui/Label";

function FormImage({
  setUploadedImage,
}: {
  setUploadedImage: (image: ImageT | null) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <CustomLabel htmlFor="image" className="-mb-4">
        Image
      </CustomLabel>
      <ImageUploader onUploadSucess={setUploadedImage} />
    </div>
  );
}

export default FormImage;
