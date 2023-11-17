import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {buildResponse, buildResponseByCustomError} from "../utils/buildReponseUtils";
import { HttpStatus, Messages} from "../utils/constants";
import {CustomError} from "../utils/customError";
import {getChargesStatus} from "../services/charge.service";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const token: string = await getChargesStatus(event);

        return buildResponse(HttpStatus.OK, token);

    } catch (error) {
        console.error(Messages.ERROR_CREATING_TOKEN, error);
        if (error instanceof CustomError) {
            return buildResponseByCustomError(error);
        } else {
            return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
