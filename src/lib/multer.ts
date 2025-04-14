import multer from "multer";

export const uploader = (filelimit: number = 2) => {
  const storage = multer.memoryStorage();

  const limits = { fileSize: filelimit * 1024 * 1024 }; // default 2 mb

  return multer({ storage, limits });
};
