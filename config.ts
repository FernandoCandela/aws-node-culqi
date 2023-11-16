import 'dotenv/config';
export const dbConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_DB_PORT) || 5432,
    database: process.env.POSTGRES_DB_NAME || 'mydatabase',
    user: process.env.POSTGRES_USER || 'myuser',
    password: process.env.POSTGRES_PASSWORD || 'mypassword',
};
export const redisDbConfig = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
};
