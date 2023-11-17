import {luhnCheck} from "../../src/utils/luhnAlgorithm";

describe('Luhn Algorithm', () => {
    it('returns true for a valid card number', () => {
        const cardNumber: string = '4556737586899855';
        const result: boolean = luhnCheck(cardNumber);
        expect(result).toBe(true);
    });

    it('returns false for an invalid card number', () => {
        const cardNumber: string = '1234567890123456';
        const result: boolean = luhnCheck(cardNumber);
        expect(result).toBe(false);
    });

    it('returns false for an empty string', () => {
        const cardNumber: string = ''; // This is an empty string
        const result: boolean = luhnCheck(cardNumber);
        expect(result).toBe(false);
    });

    it('returns false for a string with non-numeric characters', () => {
        const cardNumber = '123abc';
        const result: boolean = luhnCheck(cardNumber);
        expect(result).toBe(false);
    });
});
