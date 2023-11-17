import {generateToken} from "../../src/services/token.service";
import {APIGatewayProxyEvent} from "aws-lambda";
import {StoredData} from "../../src/models/storedData.model";
import {storeTokenInRedisDatabase} from "../../src/database/redisDb";
import {validateTokenPk, validateCardData} from "../../src/utils/validation";
import {generateRandomToken} from "../../src/utils/utils";
import {jest} from '@jest/globals';
import {storeTokenInPGDatabase} from "../../src/database/postgreSql";
import {CustomError} from "../../src/utils/customError";
import {ErrorMessages} from "../../src/utils/constants";

jest.mock('../../src/database/redisDb');
jest.mock('../../src/database/postgreSql');
jest.mock('../../src/utils/validation');
jest.mock('../../src/utils/utils');

describe('Token Service', () => {
    let event: APIGatewayProxyEvent;
    let storedData: StoredData;

    beforeEach(() => {
        event = {
            body: JSON.stringify({
                cardNumber: 4556737586899855,
                cvv: 125,
                expirationMonth: "12",
                expirationYear: "2023",
                email: "usuario@gmail.com"
            }),
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
            expirationTime: Date.now() + 60000
        } as StoredData;
    });

    it('generates a token when card data is valid', async () => {
        (validateTokenPk as jest.Mock).mockReturnValue(true);
        (validateCardData as jest.Mock).mockReturnValue(storedData.cardData);
        (generateRandomToken as jest.Mock).mockReturnValue("validToken");
        (storeTokenInRedisDatabase as jest.Mock).mockImplementation(() => Promise.resolve(undefined));
        (storeTokenInPGDatabase as jest.Mock).mockImplementation(() => Promise.resolve(undefined));
        const token: string = await generateToken(event);

        expect(token).toBe('validToken');
    });

    it('throws an error when card data is invalid', async () => {
        (validateTokenPk as jest.Mock).mockReturnValue(true);
        (validateCardData as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid card data');
        });

        await expect(generateToken(event)).rejects.toThrow('Invalid card data');
    });

    it('throws an error when token storage in Redis fails', async () => {
        (validateTokenPk as jest.Mock).mockReturnValue(true);
        (validateCardData as jest.Mock).mockReturnValue(storedData.cardData);
        (generateRandomToken as jest.Mock).mockReturnValue('validToken');
        (storeTokenInRedisDatabase as jest.Mock).mockImplementation(() => {
            throw new CustomError(ErrorMessages.ERROR_STORING_TOKEN_IN_REDIS)
        });

        await expect(generateToken(event)).rejects.toThrow("Error storing token in Redis");
    });

    it('throws an error when token storage in PostgreSQL fails', async () => {
        (validateTokenPk as jest.Mock).mockReturnValue(true);
        (validateCardData as jest.Mock).mockReturnValue(storedData.cardData);
        (generateRandomToken as jest.Mock).mockReturnValue('validToken');
        (storeTokenInRedisDatabase as jest.Mock).mockImplementation(() => Promise.resolve(undefined));
        (storeTokenInPGDatabase as jest.Mock).mockImplementation(() => {
            throw new CustomError(ErrorMessages.ERROR_STORING_TOKEN_IN_PG);
        });

        await expect(generateToken(event)).rejects.toThrow("Error storing token in PostgreSQL");
    });
});
