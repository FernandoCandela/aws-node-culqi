export enum Messages {
    VOID_RESPONSE = 'Void response',
    STORE_TOKEN_IN_REDIS = 'Storing token %s in Redis:',
    STORE_TOKEN_IN_PG = 'Storing token %s in the database:',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    ERROR_STORING_TOKEN_IN_PG = 'Error storing token in PostgreSQL',
    ERROR_STORING_TOKEN_IN_REDIS = 'Error storing token in Redis',
    ERROR_CREATING_TOKEN = 'Error creating token',
    INVALID_CARD_DATA = 'Invalid card data: All fields are required',
    INVALID_CARD_NUMBER = 'Invalid card number',
    INVALID_CVV = 'Invalid CVV',
    INVALID_EXPIRATION_MONTH = 'Invalid expiration month',
    INVALID_EXPIRATION_YEAR = 'Invalid expiration year',
    INVALID_EMAIL = 'Invalid email',
    INVALID_TOKEN_PK = 'Invalid token pk',
}

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export const ErrorMessages = {
    INTERNAL_SERVER_ERROR: {
        message: Messages.INTERNAL_SERVER_ERROR,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    ERROR_STORING_TOKEN_IN_PG: {
        message: Messages.ERROR_STORING_TOKEN_IN_PG,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    ERROR_STORING_TOKEN_IN_REDIS: {
        message: Messages.ERROR_STORING_TOKEN_IN_REDIS,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    ERROR_CREATING_TOKEN: {
        message: Messages.ERROR_CREATING_TOKEN,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_CARD_DATA: {
        message: Messages.INVALID_CARD_DATA,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
    },
    INVALID_CARD_NUMBER: {
        message: Messages.INVALID_CARD_NUMBER,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_CVV: {
        message: Messages.INVALID_CVV,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EXPIRATION_MONTH: {
        message: Messages.INVALID_EXPIRATION_MONTH,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EXPIRATION_YEAR: {
        message: Messages.INVALID_EXPIRATION_YEAR,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EMAIL: {
        message: Messages.INVALID_EMAIL,
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_TOKEN_PK: {
        message: Messages.INVALID_TOKEN_PK,
        code: HttpStatus.UNAUTHORIZED,
    },
}

export const TOKEN_EXPIRATION_TIME: number = 15 * 60 * 1000;
