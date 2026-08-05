// src/config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: Number(process.env.PORT) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  environment: process.env.NODE_ENV,
}));