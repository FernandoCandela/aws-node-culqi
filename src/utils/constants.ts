export enum Messages {
    STORE_TOKEN_IN_DATABASE = 'Storing token %s in the database:',
    VOID_RESPONSE = 'Void response',
    ERROR_STORING_TOKEN_IN_DATABASE = 'Error storing token in the database:',
}

export enum HttpStatus {
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    UNPROCESSABLE_ENTITY = 422,
}

export const ErrorMessages = {
    INTERNAL_SERVER_ERROR: {
        message: 'Internal Server Error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    INVALID_CARD_DATA: {
        message: 'Invalid card data: All fields are required',
        code: HttpStatus.UNPROCESSABLE_ENTITY,
    },
    INVALID_CARD_NUMBER: {
        message: 'Invalid card number',
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_CVV: {
        message: 'Invalid CVV',
        code: HttpStatus.BAD_REQUEST,
    },
    ERROR_CREATING_TOKEN: {
        message: 'Error creating token:',
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EXPIRATION_MONTH: {
        message: 'Invalid expiration month',
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EXPIRATION_YEAR: {
        message: 'Invalid expiration year',
        code: HttpStatus.BAD_REQUEST,
    },
    INVALID_EMAIL: {
        message: 'Invalid email',
        code: HttpStatus.BAD_REQUEST,
    },
}
