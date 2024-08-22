"use server";
import { getPlaiceholder } from "plaiceholder";

const uploadFile = async (formData: FormData) => {
  try {
    const response = await fetch("http://localhost:5005/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const data = await response.json();
    const src = data.url;

    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    if (!buffer) {
      throw new Error("Failed to Buffer file");
    }
    const { base64 } = await getPlaiceholder(buffer);

    if (!base64) {
      throw new Error("Failed to get base64");
    }
    const finalData = {
      ...data,
      placeholder: base64,
    };

    console.log("File uploaded:", finalData);
    return finalData;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: true, message: "Error uploading image. Please try again." };
  }
};

export { uploadFile };
