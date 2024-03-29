export function luhnCheck(cardNumber: string): boolean {
    if (cardNumber === '') {
        return false;
    }

    let sum = 0;
    let double = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double = !double;
    }

    return sum % 10 === 0;
}
