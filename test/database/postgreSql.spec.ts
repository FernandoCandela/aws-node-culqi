import {StoredData} from "../../src/models/storedData.model";
import {storeTokenInPGDatabase} from "../../src/database/postgreSql";
import {CustomError} from "../../src/utils/customError";

let mockError: any = null;
jest.mock('pg-promise', () => {
    return jest.fn(() => {
        return jest.fn(() => ({
            none: jest.fn(() => {
                if (mockError) {
                    throw mockError;
                }
            }),
        }));
    });
});

describe('PostgreSQL Database', () => {
    const mockData: StoredData = {
        cardData: {
            cardNumber: 4556737586899855,
            cvv: 125,
            expirationMonth: "12",
            expirationYear: "2023",
            email: "usuario@gmail.com"
        },
        expirationTime: new Date().getTime() + 1000 * 60 * 15
    };

    it('storeTokenInPGDatabase does not throw an error when storing is successful', async () => {
        await expect(storeTokenInPGDatabase('mockToken', mockData)).resolves.not.toThrow();
    });

    it('storeTokenInPGDatabase throws a CustomError when storing fails', async () => {
        mockError = new Error('Database error');

        await expect(storeTokenInPGDatabase('mockToken', mockData)).rejects.toThrow(Error);

        mockError = null;
    });
});
