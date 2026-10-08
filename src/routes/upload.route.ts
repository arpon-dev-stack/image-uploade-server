import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { signatureRateLimiter } from '../middleware/rateLimiter.js';
import { getUploadSignature, saveMediaUrl } from '../controllers/upload.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/signature', signatureRateLimiter, getUploadSignature);
router.post('/save-url', saveMediaUrl);

export default router;
