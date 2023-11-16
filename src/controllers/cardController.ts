import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {buildResponse, HttpStatus} from "../utils/utils";
import {isValidCardData} from "../utils/validation";
import {Card} from "../models/card.model";
import {createToken} from "../services/token.service";
import {ErrorMessages} from "../utils/messages";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const cardData: Card = isValidCardData(event.body);

        const token: string = createToken(cardData);

        return buildResponse(HttpStatus.OK, token);

    } catch (error: Error) {
        console.error(ErrorMessages.ERROR_CREATING_TOKEN, error);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};
