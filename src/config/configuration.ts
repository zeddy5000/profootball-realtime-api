export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT ?? '3000', 10),
    environment: process.env.NODE_ENV,
    apiPrefix: process.env.API_PREFIX,
  },
   redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB ?? '0', 10),
  },
  apiFootball: {
  baseUrl: process.env.API_FOOTBALL_BASE_URL,
  apiKey: process.env.API_FOOTBALL_KEY,
},
footballData: {
  baseUrl: process.env.FOOTBALL_DATA_BASE_URL,
  apiKey: process.env.FOOTBALL_DATA_API_KEY,
},
footballProvider: {
  provider: process.env.FOOTBALL_PROVIDER,
},
});