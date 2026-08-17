import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  API_PREFIX: Joi.string().default('api'),

  APP_NAME: Joi.string().required(),

  /*
   * Redis
   *
   * Local development:
   * REDIS_HOST + REDIS_PORT
   *
   * Render:
   * REDIS_URL
   */
  REDIS_URL: Joi.string()
    .uri({
      scheme: ['redis', 'rediss'],
    })
    .allow('')
    .optional(),

  REDIS_HOST: Joi.string().default('localhost'),

  REDIS_PORT: Joi.number().default(6379),

  REDIS_PASSWORD: Joi.string()
    .allow('')
    .optional(),

  REDIS_DB: Joi.number().default(0),

  /*
   * Football Data API
   */
  FOOTBALL_DATA_BASE_URL: Joi.string()
    .uri()
    .required(),

  FOOTBALL_DATA_API_KEY: Joi.string()
    .required(),

  /*
   * Active football data provider
   */
  FOOTBALL_PROVIDER: Joi.string()
    .valid('football-data')
    .default('football-data'),
});