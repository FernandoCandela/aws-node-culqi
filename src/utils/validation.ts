import {Card} from "../models/card.model";
import {ErrorMessages} from "./constants";
import {CustomError} from "./customError";
import {luhnCheck} from "./luhnAlgorithm";
import {APIGatewayProxyEvent} from "aws-lambda";

export function validateCardData(body: string | null | undefined): Card {
    if (body === null || body === undefined || body === "") {
        throw new CustomError(ErrorMessages.INVALID_CARD_DATA);
    }

    const cardData: Card = JSON.parse(body);

    if (!isValidCardNumber(cardData.cardNumber)) {
        throw new CustomError(ErrorMessages.INVALID_CARD_NUMBER);
    }

    if (!isValidCVV(cardData.cvv)) {
        throw new CustomError(ErrorMessages.INVALID_CVV);
    }

    if (!isValidExpirationMonth(cardData.expirationMonth)) {
        throw new CustomError(ErrorMessages.INVALID_EXPIRATION_MONTH);
    }

    if (!isValidExpirationYear(cardData.expirationYear)) {
        throw new CustomError(ErrorMessages.INVALID_EXPIRATION_YEAR);
    }

    if (!isValidEmail(cardData.email)) {
        throw new CustomError(ErrorMessages.INVALID_EMAIL);
    }

    return cardData;
}

function isValidCardNumber(cardNumber: number): boolean {
    return luhnCheck(String(cardNumber));
}

function isValidCVV(cvv: number): boolean {
    const cvvString: string = String(cvv);
    return cvvString.length === 3 || cvvString.length === 4;
}

function isValidExpirationMonth(expirationMonth: string): boolean {
    const month: number = parseInt(expirationMonth, 10);
    return month >= 1 && month <= 12;
}

function isValidExpirationYear(expirationYear: string): boolean {
    const currentYear: number = new Date().getFullYear();
    const year: number = parseInt(expirationYear, 10);
    return year >= currentYear && year <= currentYear + 5;
}

export function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    const domain: string = email.split('@')[1];

    const allowedDomains: string[] = ["gmail.com", "hotmail.com", "yahoo.es"];

    return allowedDomains.includes(domain);
}

export function validateTokenPk(event: APIGatewayProxyEvent): void {
    const tokenPk: string | undefined = event.headers['authorization'];
    const tokenRegex: RegExp = /^Bearer pk_test_[a-zA-Z0-9]{16}$/;
    if (tokenPk === undefined || !tokenRegex.test(tokenPk)) {
        throw new CustomError(ErrorMessages.INVALID_TOKEN_PK);
    }
}

export function validateToken(body: string | null | undefined): string {
    if (body === null || body === undefined || body === "") {
        throw new CustomError(ErrorMessages.INVALID_TOKEN);
    }
    const token: string = JSON.parse(body).token;

    const tokenRegex: RegExp = /^[0-9a-zA-Z]{16}$/;
    if (!tokenRegex.test(token)){
        throw new CustomError(ErrorMessages.INVALID_TOKEN);
    }

    return token;
}
