import {Card} from "../models/card.model";
import {TOKEN_EXPIRATION_TIME} from "../utils/constants";
import {StoredData} from "../models/storedData.model";
import {storeTokenInRedisDatabase} from "../database/redisDb";
import {storeTokenInPGDatabase} from "../database/postgreDb";

export async function createToken(cardData: Card): Promise<string> {
    try {
        const token: string = generateRandomToken();
        const expirationTime: number = Date.now() + TOKEN_EXPIRATION_TIME;
        const storedData: StoredData = {
            cardData,
            expirationTime,
        };

        await storeTokenInRedisDatabase(token, storedData);

        await storeTokenInPGDatabase(token, storedData);

        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function generateRandomToken(): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}



