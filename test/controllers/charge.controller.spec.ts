import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {CardResponse} from "../../src/models/card.model";
import {getChargesStatus} from "../../src/services/charge.service";
import {buildResponse} from "../../src/utils/buildReponseUtils";
import {handler} from "../../src/controllers/chargeController";


jest.mock('../../src/services/charge.service');
jest.mock('../../src/utils/buildReponseUtils');

describe('Charge Controller', () => {
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

    it('returns a card response when getChargesStatus is successful', async () => {
        const mockCardResponse: CardResponse = {
            cardNumber: 4556737586899855,
            expirationMonth: "12",
            expirationYear: "2023",
            email: "usuario@gmail.com"
        };
        (getChargesStatus as jest.Mock).mockResolvedValue(mockCardResponse);

        await handler(mockEvent, context, jest.fn());

        expect(getChargesStatus).toHaveBeenCalledWith(mockEvent);
        expect(buildResponse).toHaveBeenCalledWith(200, mockCardResponse);
    });

    /*it('returns a custom error response when getChargesStatus throws a CustomError', async () => {
        const mockError: CustomError = new CustomError(ErrorMessages.ERROR_GETTING_DATA_FROM_REDIS);
        (getChargesStatus as jest.Mock).mockRejectedValue(mockError);

        await handler(mockEvent, context, jest.fn());

        expect(getChargesStatus).toHaveBeenCalledWith(mockEvent);
        expect(buildResponseByCustomError).toHaveBeenCalledWith(mockError);
    });*/

    it('returns a 500 error response when getChargesStatus throws a non-CustomError', async () => {
        const mockError = new Error('Error');
        (getChargesStatus as jest.Mock).mockRejectedValue(mockError);

        await handler(mockEvent, context, jest.fn());

        expect(getChargesStatus).toHaveBeenCalledWith(mockEvent);
        expect(buildResponse).toHaveBeenCalledWith(500, mockError.message);
    });
});

