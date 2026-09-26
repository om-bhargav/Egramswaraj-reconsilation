import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

/**
 * False when the three Cloudinary keys are not all in `.env`, so a route can
 * say so plainly instead of failing somewhere inside the SDK.
 */
export const isCloudinaryConfigured = Boolean(
  CLOUD_NAME && API_KEY && API_SECRET,
);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export type UploadedImage = {
  /** The https delivery URL to render and to store on the row. */
  url: string;
  /** Cloudinary's id for the file, needed to delete or transform it later. */
  publicId: string;
};

/**
 * Sends a file straight to Cloudinary as a stream, so the bytes are never held
 * as a base64 string.
 *
 * Only works on the Node.js runtime — the Cloudinary SDK is not an edge module.
 */
export async function uploadImage(
  file: File,
  folder = "contact-requests",
): Promise<UploadedImage> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary is not configured — set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET",
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  return new Promise<UploadedImage>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned no result"));
          return;
        }

        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    upload.end(bytes);
  });
}

/** Removes an uploaded image, for when a request is deleted. */
export async function deleteImage(publicId: string) {
  if (!isCloudinaryConfigured) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
