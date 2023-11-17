import {StoredData} from "../models/storedData.model";
import {CardResponse} from "../models/card.model";

export function storedDataToCardResponse(storedData: StoredData) {
    const cardResponse: CardResponse = {
        cardNumber: storedData.cardData.cardNumber,
        expirationMonth: storedData.cardData.expirationMonth,
        expirationYear: storedData.cardData.expirationYear,
        email: storedData.cardData.email,
    };
    return cardResponse;
}
