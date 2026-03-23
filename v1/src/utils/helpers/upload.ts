import multer from "multer";
import { Request, Response, NextFunction } from 'express';
import { cloudinary } from "../../config/cloudinary";
import { RequestValidationError } from "../../errors";

// Configure multer for memory storage
const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'image/jpeg', 'image/png',
  'image/webp', 'image/svg+xml',
  'image/svg+xml', 'image/jpg',
  'text/plain', 'application/pdf',
  'application/msword', 
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req:any, file:any, cb:any) => {
  // Check file type
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new RequestValidationError('Invalid file type. Only PDF, DOC, DOCX, JPEG, PNG, and TXT files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
})

const uploadMultiple = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 5 // Max: 10 files
  },
})

// Error handling middleware for multer
const handleMulterError = ( err: any, req: Request, res: Response, next: NextFunction ) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new RequestValidationError('File too large. Maximum size is 10MB.'));
    }
    return next(new RequestValidationError(err.message));
  }
  next(err);
};

const validateImageCount = (req: Request, res: Response, next: NextFunction) => {
  const images = req.files as Express.Multer.File[];

  if(!images || images.length === 0){
    return next(new RequestValidationError("At least 1 product image is required"));
  }

  if(images.length > 5){
    return next(new RequestValidationError("Exceeded maximum of 5 images"));
  }

  next();
}

export { upload, uploadMultiple, handleMulterError, validateImageCount };
  


