export function luhnCheck(cardNumber: string): boolean {
    // Convertir el número de tarjeta a un array de dígitos
    const digits: number[] = cardNumber.split('').map(Number);

    // Reverse the array of digits
    let sum: number = 0;
    let double: boolean = false;

    for (let i: number = digits.length - 1; i >= 0; i--) {
        let digit: number = digits[i];

        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double = !double;
    }

    // El número de tarjeta es válido si la suma total es un múltiplo de 10
    return sum % 10 === 0;
}
