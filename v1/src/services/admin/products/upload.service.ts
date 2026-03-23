import { cloudinary } from "../../../config/cloudinary";
import { InternalServerError } from "../../../errors";

export class UploadService {
  static uploadFile = async (file:Express.Multer.File, options:any = {}) => {
    try {
      const { buffer, originalname, mimetype } = file;

      // Convert buffer to base64
      const b64 = Buffer.from(buffer).toString('base64');
      const dataURI = `data:${mimetype};base64,${b64}`;

      // Upload options
      const uploadOptions = {
        resource_type: 'auto' as const,
        public_id: `document-${Date.now()}-${originalname.split('.')[0]}`,
        folder: 'documents',
        ...options,
      };

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        size: result.bytes,
        format: result.format,
        resourceType: result.resource_type,
      };
    } catch (error) {
      console.error('Product image upload error:', error);
      throw error
    }
  }

  static uploadFiles = async (files:Express.Multer.File[]) => {
    try {
      const uploadImages = files.map( async(file) => {
        const { buffer, originalname, mimetype } = file;

        // Convert buffer to base64
        const b64 = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${mimetype};base64,${b64}`;

        // Upload options
        const uploadOptions = {
          resource_type: 'auto' as const,
          public_id: `document-${Date.now()}-${originalname.split('.')[0]}`,
          transformation: [
            { width: 1000, height: 1000, crop:"limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
          folder: 'e_commerce/products'
        };

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

        return {
          name: originalname,
          fileUrl: result.secure_url,
          publicId: result.public_id,
          fileSize: result.bytes,
          format: result.format,
          fileType: result.resource_type,
        };

      })

      return Promise.all(uploadImages);
    } catch (error) {
      console.error('Product images upload error:', error);
      throw error
    }
  }

  static deleteFile = async (publicId: string) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        return true;
      } else {
        throw new InternalServerError("Failed to delete file!")
      }
    } catch (error) {
      console.error('Product image delete error:', error);
      throw error
    }
  }

  static deleteFiles = async (files:any[]) => {
    try {
      const deleteImages = files.map( async(file) => {
        const result = await cloudinary.uploader.destroy(file.publicId);
        if (result.result === 'ok') {
          return true;
        } else {
          return null;
        }
      })

      return Promise.all(deleteImages);
    } catch (error) {
      console.error('Product images delete error:', error);
      throw error
    }
  }
}