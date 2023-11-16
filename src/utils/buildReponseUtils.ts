import {APIGatewayProxyResult} from "aws-lambda";
import {Messages, HttpStatus} from "./constants";
import {CustomError} from "./customError";

export function buildResponse(statusCode: HttpStatus, body: any = null): APIGatewayProxyResult {
    let bodyResponse: string = Messages.VOID_RESPONSE;

    if (body !== null) {
        bodyResponse = JSON.stringify(statusCode >= 200 && statusCode <= 299
            ? body
            : {error: body});
    }

    return {
        statusCode: statusCode,
        body: bodyResponse,
    };
}

export function buildResponseByCustomError(customError: CustomError): APIGatewayProxyResult {

    let bodyResponse: string = JSON.stringify({error: customError.message});

    return {
        statusCode: customError.code,
        body: bodyResponse,
    };
}
