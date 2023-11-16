import {Card} from "../models/card.model";
import {ErrorMessages} from "./messages";

export function isValidCardData(body: string | null): Card {
    if (body === null) {
        throw new Error(ErrorMessages.INVALID_CARD_DATA);
    }

    const cardData: Card = JSON.parse(body);

    if (!isValidCardNumber(cardData.cardNumber)) {
        throw new Error(ErrorMessages.INVALID_CARD_NUMBER);
    }

    if (!isValidCVV(cardData.cvv)) {
        throw new Error(ErrorMessages.INVALID_CVV);
    }

    if (!isValidExpirationMonth(cardData.expirationMonth)) {
        throw new Error(ErrorMessages.INVALID_EXPIRATION_MONTH);
    }

    if (!isValidExpirationYear(cardData.expirationYear)) {
        throw new Error(ErrorMessages.INVALID_EXPIRATION_YEAR);
    }

    if (!isValidEmail(cardData.email)) {
        throw new Error(ErrorMessages.INVALID_EMAIL);
    }

    return cardData;
}

// Métodos de validación adicionales
function isValidCardNumber(cardNumber: number): boolean {
    // Implementa tu lógica de validación para el número de tarjeta
    // En este ejemplo, se asume que el número de tarjeta debe tener exactamente 16 dígitos
    return String(cardNumber).length === 16;
}

function isValidCVV(cvv: number): boolean {
    // Implementa tu lógica de validación para el CVV
    // En este ejemplo, se asume que el CVV debe tener 3 o 4 dígitos
    const cvvString: string = String(cvv);
    return cvvString.length === 3 || cvvString.length === 4;
}

function isValidExpirationMonth(expirationMonth: string): boolean {
    // Implementa tu lógica de validación para el mes de vencimiento
    const month: number = parseInt(expirationMonth, 10);
    return month >= 1 && month <= 12;
}

function isValidExpirationYear(expirationYear: string): boolean {
    // Implementa tu lógica de validación para el año de vencimiento
    const currentYear: number = new Date().getFullYear();
    const year: number = parseInt(expirationYear, 10);
    return year >= currentYear && year <= currentYear + 5; // Asumiendo que la tarjeta es válida hasta 5 años en el futuro
}


function isValidEmail(email: string): boolean {
    // Implementa tu lógica de validación para la dirección de correo electrónico
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
