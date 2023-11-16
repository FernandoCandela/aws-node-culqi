import crypto from 'crypto';
import {Card} from "../models/card.model";
import {Messages} from "../utils/constants";

const TOKEN_EXPIRATION_TIME: number = 15 * 60 * 1000; // 15 minutos en milisegundos

export function createToken(cardData: Card): string {
    // Generar un token único utilizando crypto.randomBytes
    const token = crypto.randomBytes(16).toString('hex');

    // Aquí deberías almacenar el token junto con la información de la tarjeta en tu base de datos no relacional con el tiempo de expiración

    // Simulando el almacenamiento en la base de datos no relacional
    const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
    const storedData = {
        cardData,
        expirationTime,
    };

    // Simulación de almacenamiento en una base de datos no relacional (por ejemplo, Redis)
    storeTokenInDatabase(token, storedData);

    return token;
}

// Función para simular el almacenamiento en una base de datos no relacional
function storeTokenInDatabase(token: string, data: any): void {
    // Simulación de almacenamiento en una base de datos no relacional
    // Aquí deberías implementar la lógica real de almacenamiento en tu base de datos no relacional
    console.log(Messages.STORE_TOKEN_IN_DATABASE, data);
}
