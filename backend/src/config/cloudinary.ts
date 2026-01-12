// src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Profile pictures storage
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill', quality: 'auto' }]
  } as any
});

// Banner storage
const bannerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/banners',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 400, crop: 'fill', quality: 'auto' }]
  } as any
});

// Background storage
const backgroundStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/backgrounds',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1920, height: 1080, crop: 'fill', quality: 'auto' }]
  } as any
});

// Audio storage
const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/audio',
    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
    resource_type: 'video' // Cloudinary uses 'video' for audio files
  } as any
});

// Cursor storage
const cursorStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/cursors',
    allowed_formats: ['png', 'cur', 'gif'],
    transformation: [{ width: 64, height: 64, crop: 'limit' }]
  } as any
});

// Gallery storage
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'starlit/profiles/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'fill', quality: 'auto' }]
  } as any
});

// Create multer instances
export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadBanner = multer({
  storage: bannerStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export const uploadBackground = multer({
  storage: backgroundStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

export const uploadCursor = multer({
  storage: cursorStorage,
  limits: { fileSize: 1 * 1024 * 1024 } // 1MB
});

export const uploadGallery = multer({
  storage: galleryStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB per image
});

// Combined upload for profile creation
export const uploadProfileImages = multer({
  storage: multer.memoryStorage(), // We'll handle storage manually
  limits: { fileSize: 10 * 1024 * 1024 }
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]);

// Helper function to upload to Cloudinary
export const uploadToCloudinary = async (
  file: Express.Multer.File, 
  folder: string, 
  transformation?: any[],
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `starlit/profiles/${folder}`,
        transformation,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    // Extract public_id from URL
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) return;
    
    // Get everything after 'upload/vXXXXX/'
    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, ''); // Remove extension
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

export { cloudinary };
