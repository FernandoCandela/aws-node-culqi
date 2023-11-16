import pgPromise from 'pg-promise';
import {dbConfig} from "../../config";
import {StoredData} from "../models/storedData.model";
import {ErrorMessages, Messages} from "../utils/constants";
import {CustomError} from "../utils/customError";

const pgp = pgPromise();
const db = pgp(dbConfig);

export async function storeTokenInPGDatabase(token: string, data: StoredData): Promise<void> {
    try {
        await db.none('INSERT INTO tokens(token, card_number, cvv, expiration_month, expiration_year, email, created_at, expiration_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            [token, data.cardData.cardNumber, data.cardData.cvv, data.cardData.expirationMonth, data.cardData.expirationYear, data.cardData.email, new Date(), new Date(data.expirationTime)]);
        console.log(Messages.STORE_TOKEN_IN_PG, data);
    } catch (error) {
        console.error(Messages.ERROR_STORING_TOKEN_IN_PG, error);
        throw new CustomError(ErrorMessages.ERROR_STORING_TOKEN_IN_PG);
    }
}
