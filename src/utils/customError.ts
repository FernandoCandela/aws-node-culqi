import {ErrorMessages, HttpStatus} from "./constants";

export class CustomError extends Error {
    code: HttpStatus;
    private underlyingError: Error | undefined;

    constructor(errorMessages: typeof ErrorMessages[keyof typeof ErrorMessages], underlyingError?: Error) {
        super(errorMessages.message);
        this.name = 'CustomError';
        this.code = errorMessages.code;
        this.underlyingError = underlyingError;
    }
}
