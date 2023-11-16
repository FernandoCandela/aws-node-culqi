import {Card} from "../models/card.model";
import {ErrorMessages} from "./messages";

export function isValidCardData(body: string | null): Card {
    if (body === null) {
        throw new Error(ErrorMessages.INVALID_CARD_NUMBER);
    }

    const cardData: Card = JSON.parse(body);

    if (cardData.cardNumber !== 16) {
        throw new Error(ErrorMessages.INVALID_CARD_NUMBER);
    }

    return cardData;
}
