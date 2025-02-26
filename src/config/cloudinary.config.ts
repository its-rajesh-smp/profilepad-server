import { getEnv } from "../api/utils";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: getEnv("CLOUDINARY_CLOUD_NAME"),
  api_key: getEnv("CLOUDINARY_API_KEY"),
  api_secret: getEnv("CLOUDINARY_API_SECRET"),
});

export default cloudinary;
