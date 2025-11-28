import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload (File or Buffer)
 * @param folder - The folder path in Cloudinary (e.g., "applications/123")
 * @param publicId - Optional public ID for the file
 * @returns Promise with the upload result containing secure_url
 */
export async function uploadToCloudinary(
  file: File | Buffer,
  folder: string,
  publicId?: string
): Promise<{ secure_url: string; public_id: string }> {
  // Convert File to buffer if needed
  const buffer = file instanceof File ? await file.arrayBuffer() : file
  const base64 = Buffer.from(buffer).toString("base64")
  const dataURI = `data:${file instanceof File ? file.type : "application/octet-stream"};base64,${base64}`

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      public_id: publicId,
      resource_type: "auto", // Automatically detect image, video, or raw
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    })

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error(`Failed to upload file to Cloudinary: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Delete a file from Cloudinary
 * @param publicId - The public ID of the file to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error(`Failed to delete file from Cloudinary: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

