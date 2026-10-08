import rateLimit from 'express-rate-limit';

export const signatureRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many upload signature requests. Please try again later.' },
});
