import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface SignatureResponse {
  signature: string;
  timestamp: number;
  folder: string;
  allowedFormats: string;
  maxFileSize: number;
  cloudName: string;
  apiKey: string;
}

export const generateUploadSignature = (
  userId: number,
  category: string = 'general'
): SignatureResponse => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `users/${userId}/${category}`;
  const allowedFormats = 'jpg,jpeg,png,webp';
  const maxFileSize = 5000000; // 5 MB limit

  const paramsToSign = {
    folder,
    timestamp,
    allowed_formats: allowedFormats,
    max_file_size: maxFileSize,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    env.CLOUDINARY_API_SECRET
  );

  return {
    signature,
    timestamp,
    folder,
    allowedFormats,
    maxFileSize,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
  };
};

export { cloudinary };
