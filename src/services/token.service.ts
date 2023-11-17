import {Card} from "../models/card.model";
import {TOKEN_EXPIRATION_TIME_IN_MILLISECONDS} from "../utils/constants";
import {StoredData} from "../models/storedData.model";
import {storeTokenInRedisDatabase} from "../database/redisDb";
import {storeTokenInPGDatabase} from "../database/postgreDb";
import {APIGatewayProxyEvent} from "aws-lambda";
import {validateCardData, validateTokenPk} from "../utils/validation";
import {generateRandomToken} from "../utils/utils";

export async function generateToken(event: APIGatewayProxyEvent): Promise<string> {
    validateTokenPk(event);

    const cardData: Card = validateCardData(event.body);

    return await createToken(cardData);
}

async function createToken(cardData: Card): Promise<string> {
    try {
        const token: string = generateRandomToken();
        const expirationTime: number = Date.now() + TOKEN_EXPIRATION_TIME_IN_MILLISECONDS;
        const storedData: StoredData = {
            cardData,
            expirationTime,
        };

        await storeTokenInRedisDatabase(token, storedData);

        await storeTokenInPGDatabase(token, storedData);

        return token;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}



