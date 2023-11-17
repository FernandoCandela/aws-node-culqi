export function generateRandomToken(): string {
    const characters: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token: string = '';

    for (let i: number = 0; i < 16; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}
