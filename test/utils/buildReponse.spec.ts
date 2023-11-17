import {buildResponse, buildResponseByCustomError} from "../../src/utils/buildReponseUtils";
import {CustomError} from "../../src/utils/customError";
import {APIGatewayProxyResult} from "aws-lambda";
import {ErrorMessages} from "../../src/utils/constants";

describe('Response Utils', () => {
    it('buildResponse returns a response with the given status code and body', () => {
        const statusCode = 200;
        const body = {message: 'Success'};

        const response: APIGatewayProxyResult = buildResponse(statusCode, body);

        expect(response.statusCode).toBe(statusCode);
        expect(response.body).toBe(JSON.stringify(body));
    });

    it('buildResponse returns a response with an error message when status code is not successful', () => {
        const statusCode: number = 400;
        const body: string = 'Error';

        const response: APIGatewayProxyResult = buildResponse(statusCode, body);

        expect(response.statusCode).toBe(statusCode);
        expect(response.body).toBe(JSON.stringify({error: body}));
    });

    it('buildResponseByCustomError returns a response with the status code and message from the CustomError', () => {
        const customError: CustomError = new CustomError(ErrorMessages.INTERNAL_SERVER_ERROR);

        const response: APIGatewayProxyResult = buildResponseByCustomError(customError);

        expect(response.statusCode).toBe(customError.code);
        expect(response.body).toBe(JSON.stringify({error: customError.message}));
    });
});
