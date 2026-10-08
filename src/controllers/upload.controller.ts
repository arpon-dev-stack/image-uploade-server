import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { generateUploadSignature } from '../lib/cloudinary.js';
import { signatureRequestSchema, saveUrlSchema } from '../schemas/upload.schema.js';

export const getUploadSignature = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User contextual ID missing' });
      return;
    }

    const { category } = signatureRequestSchema.parse(req.body);
    const signatureData = generateUploadSignature(userId, category);

    res.status(200).json(signatureData);
  } catch (error) {
    next(error);
  }
};

export const saveMediaUrl = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { imageUrl, publicId } = saveUrlSchema.parse(req.body);

    res.status(200).json({
      message: 'Media URL registered successfully',
      media: {
        userId,
        imageUrl,
        publicId,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
