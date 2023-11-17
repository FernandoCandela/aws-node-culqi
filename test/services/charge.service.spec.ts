import {APIGatewayProxyEvent} from "aws-lambda";

import {expect, jest} from '@jest/globals';
import {StoredData} from "../../src/models/storedData.model";
import {validateToken} from "../../src/utils/validation";
import {getCardRedis, storeTokenInRedisDatabase} from "../../src/database/redisDb";
import {CardResponse} from "../../src/models/card.model";
import {getChargesStatus} from "../../src/services/charge.service";
import {CustomError} from "../../src/utils/customError";

jest.mock('../../src/database/redisDb');
jest.mock('../../src/utils/validation');
jest.mock('../../src/utils/utils');

describe('Charge Service', () => {
    let event: APIGatewayProxyEvent;
    let storedData: StoredData;

    beforeEach(() => {

        event = {
            body: JSON.stringify({token: 'validToken'}),
            headers: {},
            httpMethod: '',
            isBase64Encoded: false,
            path: '',
            pathParameters: {},
            queryStringParameters: {},
            stageVariables: {},
            requestContext: {} as any,
            resource: ''
        } as APIGatewayProxyEvent;

        storedData = {
            cardData: {
                cardNumber: 4556737586899855,
                cvv: 125,
                expirationMonth: "12",
                expirationYear: "2023",
                email: "usuario@gmail.com"
            },
            expirationTime: 123456789
        } as StoredData;

    });

    it('returns card response when token is valid', async () => {
        (validateToken as jest.Mock).mockReturnValue('validToken');
        (getCardRedis as jest.Mock).mockImplementation(() => Promise.resolve(storedData));
        const cardResponse: CardResponse = await getChargesStatus(event);
        expect(cardResponse).toBeDefined();
    });

    it('throws error when token is not found or expired', async () => {
        (validateToken as jest.Mock).mockReturnValue('invalidToken');
        (getCardRedis as jest.Mock).mockImplementation(() => Promise.resolve(null));
        await expect(getChargesStatus(event)).rejects.toThrow(Error);
    });
});
