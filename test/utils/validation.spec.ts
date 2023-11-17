import {APIGatewayProxyEvent} from 'aws-lambda';
import {isValidEmail, validateCardData, validateToken, validateTokenPk} from "../../src/utils/validation";
import {Card} from "../../src/models/card.model";
import {CustomError} from "../../src/utils/customError";


describe('Validation Utils', () => {
    let mockEvent: APIGatewayProxyEvent;
    let mockEvent2: APIGatewayProxyEvent;

    beforeEach(() => {

        mockEvent = {
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

        mockEvent2 = {
            body: JSON.stringify({
                token: 'JUT0kjpPXM0Unih0'
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
    });

    it('validateCardData returns card data when card data is valid', () => {
        const cardData: Card = validateCardData(mockEvent.body);

        expect(cardData).toEqual(JSON.parse(mockEvent.body as string));
    });

    it('validateCardData throws a CustomError when card data is invalid', () => {
        mockEvent.body = JSON.stringify({});

        expect(() => validateCardData(mockEvent.body)).toThrow(Error);
    });

    it('validateTokenPk does not throw an error when token pk is valid', () => {
        expect(() => validateTokenPk(mockEvent)).not.toThrow(CustomError);
    });

    it('validateTokenPk throws a CustomError when token pk is invalid', () => {
        mockEvent.headers.authorization = 'invalidTokenPk';

        expect(() => validateTokenPk(mockEvent)).toThrow(Error);
    });

    it('validateToken returns token when token is valid', () => {
        const token: string = validateToken(mockEvent2.body);

        expect(token).toBe(JSON.parse(mockEvent2.body as string).token);
    });

    it('validateToken throws a CustomError when token is invalid', () => {
        mockEvent.body = JSON.stringify({token: 'invalidToken'});

        expect(() => validateToken(mockEvent.body)).toThrow(Error);
    });
});

describe('Email Validation', () => {
    it('returns true for a valid email', () => {
        const email: string = 'usuario@gmail.com'; // This is a valid email
        const result: boolean = isValidEmail(email);
        expect(result).toBe(true);
    });

    it('returns false for an invalid email', () => {
        const email: string = 'invalidEmail'; // This is an invalid email
        const result: boolean = isValidEmail(email);
        expect(result).toBe(false);
    });

    it('returns false for an email with an invalid domain', () => {
        const email: string = 'usuario@invalid.com'; // This is an email with an invalid domain
        const result: boolean = isValidEmail(email);
        expect(result).toBe(false);
    });
});

