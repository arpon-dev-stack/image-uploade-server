import { z } from 'zod';

export const signatureRequestSchema = z.object({
  category: z.enum(['avatars', 'posts', 'documents', 'general']).default('general'),
});

export const saveUrlSchema = z.object({
  imageUrl: z.string().url('Invalid Cloudinary image URL'),
  publicId: z.string().min(1, 'Cloudinary public_id is required'),
});

export type SignatureRequestBody = z.infer<typeof signatureRequestSchema>;
export type SaveUrlBody = z.infer<typeof saveUrlSchema>;
