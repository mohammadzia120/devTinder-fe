import axios from "axios";
import { BASE_URL } from "./constants";

const uploadToS3 = async (file) => {
  const res = await axios.post(
    `${BASE_URL}/s3/upload-url`,
    {
      fileType: file.type,
    },
    { withCredentials: true }
  );
  const { uploadUrl, publicUrl } = res.data;
  await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });
  return publicUrl;
};

export default uploadToS3;
