export const findPublicId = (fileUrl) => {
  return fileUrl.split("/")[fileUrl.split("/").length - 1].split(".")[0];
};
