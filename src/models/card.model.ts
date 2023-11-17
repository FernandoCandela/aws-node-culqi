export interface Card {
    cardNumber: number;
    cvv: number;
    expirationMonth: string;
    expirationYear: string;
    email: string;
}

export interface CardResponse {
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    email: string;
}
