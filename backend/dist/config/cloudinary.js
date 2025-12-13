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
    }
});
// Banner storage
const bannerStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'starlit/profiles/banners',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 400, crop: 'fill', quality: 'auto' }]
    }
});
// Gallery storage
const galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'starlit/profiles/gallery',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'fill', quality: 'auto' }]
    }
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
export const uploadToCloudinary = async (file, folder, transformation) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder: `starlit/profiles/${folder}`,
            transformation,
            resource_type: 'auto'
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result.secure_url);
        });
        uploadStream.end(file.buffer);
    });
};
// Delete image from Cloudinary
export const deleteFromCloudinary = async (url) => {
    try {
        const publicId = url.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`starlit/profiles/${publicId}`);
    }
    catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};
export { cloudinary };
