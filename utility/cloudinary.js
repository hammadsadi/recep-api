import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "drxmob5yo",
  api_key: "726798667568428",
  api_secret: "AzqM17_ELPpOrLcYvPOCMeT1q2w",
});

// Upload file to Cloudinary
export const uploadFileToCloudinary = async (filePath) => {
  let data = cloudinary.v2.uploader.upload(filePath);
  return data;
};

// Delete file to Cloudinary
export const deleteFileToCloudinary = async (fileId) => {
  cloudinary.v2.uploader.destroy(fileId);
};
