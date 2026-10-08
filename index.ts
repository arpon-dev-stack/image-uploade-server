import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import uploadRouter from './routes/upload.route.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'media-service' });
});

app.use('/api/media', uploadRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.info(`🚀 Media Microservice listening at http://localhost:${env.PORT}`);
});
