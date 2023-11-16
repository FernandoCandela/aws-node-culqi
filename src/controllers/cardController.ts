import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {buildResponse, buildResponseByCustomError} from "../utils/buildReponseUtils";
import {validateCardData} from "../utils/validation";
import {Card} from "../models/card.model";
import {createToken} from "../services/token.service";
import {ErrorMessages, HttpStatus} from "../utils/constants";
import {CustomError} from "../utils/customError";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const cardData: Card = validateCardData(event.body);

        const token: string = createToken(cardData);

        return buildResponse(HttpStatus.OK, token);

    } catch (error) {
        if (error instanceof CustomError) {
            console.error(ErrorMessages.ERROR_CREATING_TOKEN.message, error);
            return buildResponseByCustomError(error);
        } else {
            return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
