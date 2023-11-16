export enum ErrorMessages {
    INVALID_CARD_DATA = 'Invalid card data: All fields are required',
    INVALID_CARD_NUMBER = 'Invalid card number',
    INVALID_CVV = 'Invalid CVV',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    ERROR_CREATING_TOKEN = 'Error creating token:',
    INVALID_EXPIRATION_MONTH = 'Invalid expiration month',
    INVALID_EXPIRATION_YEAR = 'Invalid expiration year',
    INVALID_EMAIL = 'Invalid email',
}

export enum Messages {
    STORE_TOKEN_IN_DATABASE = 'Storing token %s in the database:',
    VOID_RESPONSE = 'void response'
}
