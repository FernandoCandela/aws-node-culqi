import {APIGatewayProxyResult} from "aws-lambda";

export enum HttpStatus {
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
}

export function buildResponse(statusCode: HttpStatus, body: any = null): APIGatewayProxyResult {
    let bodyResponse: string = "void response";

    if (body !== null) {
        bodyResponse = JSON.stringify(statusCode >= 200 && statusCode < 299
            ? body
            : {error: body});
    }

    return {
        statusCode: statusCode,
        body: bodyResponse,
    };
}
