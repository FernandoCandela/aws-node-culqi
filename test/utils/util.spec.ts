import {generateRandomToken} from "../../src/utils/utils";

describe('Utils', () => {
    it('generateRandomToken returns a string of length 16', () => {
        const token: string = generateRandomToken();
        expect(typeof token).toBe('string');
        expect(token.length).toBe(16);
    });

    it('generateRandomToken returns a string with only valid characters', () => {
        const token: string = generateRandomToken();
        const validCharacters: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i: number = 0; i < token.length; i++) {
            expect(validCharacters).toContain(token[i]);
        }
    });

    it('generateRandomToken returns different tokens on each call', () => {
        const token1: string = generateRandomToken();
        const token2: string = generateRandomToken();
        expect(token1).not.toBe(token2);
    });
});
