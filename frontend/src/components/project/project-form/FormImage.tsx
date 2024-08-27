import ImageUploader, { ImageT } from "@/components/common/ui/ImageUploader";
import CustomLabel from "@/components/common/ui/Label";

function FormImage({
  setUploadedImage,
  image,
}: {
  setUploadedImage: (image: ImageT | null) => void;
  image?: ImageT | null;
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
