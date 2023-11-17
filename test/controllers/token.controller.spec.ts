import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {generateToken} from "../../src/services/token.service";
import {handler} from "../../src/controllers/tokenController";
import {buildResponse} from "../../src/utils/buildReponseUtils";

jest.mock('../../src/services/token.service');
jest.mock('../../src/utils/buildReponseUtils');

describe('Token Controller', () => {
    let mockEvent: APIGatewayProxyEvent;
    let context: Context;

    beforeEach(() => {
        mockEvent = {
            body: '',
            headers: {},
            multiValueHeaders: {},
            httpMethod: '',
            isBase64Encoded: false,
            path: '',
            pathParameters: {},
            queryStringParameters: {},
            multiValueQueryStringParameters: {},
            stageVariables: {},
            requestContext: {},
            resource: ''
        } as APIGatewayProxyEvent;
        context = {
            awsRequestId: "",
            callbackWaitsForEmptyEventLoop: false,
            functionName: "",
            functionVersion: "",
            invokedFunctionArn: "",
            logGroupName: "",
            logStreamName: "",
            memoryLimitInMB: "",
            done(error?: Error, result?: any): void {
            },
            fail(error: Error | string): void {
            },
            getRemainingTimeInMillis(): number {
                return 0;
            },
            succeed(messageOrObject: any, object?: any): void {
            }
        };
        jest.clearAllMocks();
    });

    it('returns a token when generateToken is successful', async () => {
        const mockToken: string = 'mockToken';
        (generateToken as jest.Mock).mockResolvedValue(mockToken);

        await handler(mockEvent, context, jest.fn());

        expect(generateToken).toHaveBeenCalledWith(mockEvent);
        expect(buildResponse).toHaveBeenCalledWith(200, mockToken);
    });

    it('returns a 500 error response when generateToken throws a non-CustomError', async () => {
        const mockError: Error = new Error('Error');
        (generateToken as jest.Mock).mockRejectedValue(mockError);

        await handler(mockEvent, context, jest.fn());

        expect(generateToken).toHaveBeenCalledWith(mockEvent);
        expect(buildResponse).toHaveBeenCalledWith(500, mockError.message);
    });
});
