import crypto from 'crypto';
import {Card} from "../models/card.model";
import {Messages} from "../utils/constants";
import Redis from "ioredis";
import {RedisClient} from "ioredis/built/connectors/SentinelConnector/types";

const TOKEN_EXPIRATION_TIME: number = 15 * 60 * 1000; // 15 minutos en milisegundos

interface StoredData {
    cardData: Card;
    expirationTime: number;
}

export function createToken(cardData: Card): string {
    const token = crypto.randomBytes(16).toString('hex');
    const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
    const storedData: StoredData = {
        cardData,
        expirationTime,
    };

    storeTokenInDatabase(token, storedData).catch((error) => {
        console.error(Messages.ERROR_STORING_TOKEN_IN_DATABASE, error);
    });

    return token;
}

async function storeTokenInDatabase(token: string, data: StoredData): Promise<void> {
    const redis: Redis = new Redis({
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    });

    try {
        await redis.setex(token, TOKEN_EXPIRATION_TIME, JSON.stringify(data));
        console.log(Messages.STORE_TOKEN_IN_DATABASE, data);
    } catch (error) {
        console.error(Messages.ERROR_STORING_TOKEN_IN_DATABASE, error);
    } finally {
        redis.quit();
    }
}
