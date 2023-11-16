import {StoredData} from "../models/storedData.model";
import Redis from "ioredis";
import {redisDbConfig} from "../../config";
import {ErrorMessages, Messages, TOKEN_EXPIRATION_TIME} from "../utils/constants";
import {CustomError} from "../utils/customError";

export async function storeTokenInRedisDatabase(token: string, data: StoredData): Promise<void> {
    const redis: Redis = new Redis(redisDbConfig);
    try {
        await redis.setex(token, TOKEN_EXPIRATION_TIME, JSON.stringify(data));
        console.log(Messages.STORE_TOKEN_IN_REDIS, data);
    } catch (error) {
        console.error(Messages.ERROR_STORING_TOKEN_IN_REDIS, error);
        throw new CustomError(ErrorMessages.ERROR_STORING_TOKEN_IN_REDIS);
    } finally {
        redis.quit();
    }
}
