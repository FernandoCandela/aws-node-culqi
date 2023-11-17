import {StoredData} from "../models/storedData.model";
import Redis from "ioredis";
import {
    ErrorMessages,
    Messages, TOKEN_EXPIRATION_TIME_IN_MILLISECONDS
} from "../utils/constants";
import {CustomError} from "../utils/customError";
import {redisDbConfig} from "./config";

export async function storeTokenInRedisDatabase(token: string, data: StoredData): Promise<void> {
    const redis: Redis = new Redis(redisDbConfig);
    try {
        await redis.setex(token, TOKEN_EXPIRATION_TIME_IN_MILLISECONDS / 1000, JSON.stringify(data));
        console.log(Messages.STORE_TOKEN_IN_REDIS, data);
    } catch (error) {
        console.error(Messages.ERROR_STORING_TOKEN_IN_REDIS, error);
        throw new CustomError(ErrorMessages.ERROR_STORING_TOKEN_IN_REDIS);
    } finally {
        redis.quit();
    }
}

export async function getCardRedis(token: string): Promise<StoredData | null> {
    const redis: Redis = new Redis(redisDbConfig);
    try {
        const data: string | null = await redis.get(token);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(Messages.ERROR_GETTING_DATA_FROM_REDIS, error);
        throw new CustomError(ErrorMessages.ERROR_GETTING_DATA_FROM_REDIS);
    } finally {
        redis.quit();
    }
}
