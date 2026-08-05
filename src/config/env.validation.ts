import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required(),

  PORT: Joi.number().default(3000),

  API_PREFIX: Joi.string().default('api'),

  APP_NAME: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),

  REDIS_PORT: Joi.number().required(),

  REDIS_PASSWORD: Joi.string().allow('').optional(),

  REDIS_DB: Joi.number().default(0),
});