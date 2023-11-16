export function luhnCheck(cardNumber: string): boolean {
    // Convertir el número de tarjeta a un array de dígitos
    const digits = cardNumber.split('').map(Number);

    // Reverse the array of digits
    let sum = 0;
    let double = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

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
