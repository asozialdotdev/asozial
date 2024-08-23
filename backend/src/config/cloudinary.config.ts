import { v2 as cloudinary } from "cloudinary";
import multer, { Multer } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryStorageParams {
  folder?: string;
  allowed_formats?: string[];
  public_id?: (req: Express.Request, file: Express.Multer.File) => string;
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "asozial",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => {
      const timestamp = Date.now();
      return `${file.fieldname}-${timestamp}`;
    },
  } as CloudinaryStorageParams,
});

const fileUploader: Multer = multer({ storage });

export default fileUploader;
