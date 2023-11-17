import {APIGatewayProxyEvent} from "aws-lambda";
import {validateToken, validateTokenPk} from "../utils/validation";
import {getCardRedis} from "../database/redisDb";
import {CardResponse} from "../models/card.model";
import {storedDataToCardResponse} from "../utils/mappingUtils";
import {CustomError} from "../utils/customError";
import {ErrorMessages} from "../utils/constants";
import {StoredData} from "../models/storedData.model";

export async function getChargesStatus(event: APIGatewayProxyEvent): Promise<CardResponse> {
    validateTokenPk(event);

    const token: string = validateToken(event.body);

    return await getCardResponse(token);
}

async function getCardResponse(token: string): Promise<CardResponse> {

    const storedData: StoredData | null = await getCardRedis(token);

    if (!storedData) {
        throw new CustomError(ErrorMessages.TOKEN_NOT_FOUND_OR_EXPIRED);
    }

    return storedDataToCardResponse(storedData);
}
