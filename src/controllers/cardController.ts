import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {buildResponse, HttpStatus} from "../utils/utils";
import {isValidCardData} from "../utils/validation";
import {Card} from "../models/card.model";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const cardData: Card = isValidCardData(event.body);

        //const token = createToken(cardData);

        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "token");

    } catch (error: Error) {
        console.error('Error creating token:', error);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};
