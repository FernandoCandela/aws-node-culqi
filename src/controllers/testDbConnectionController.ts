import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from 'pg';

export const handler: APIGatewayProxyHandler = async () => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_DB_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
    });

    try {
        await client.connect();
        await client.query('SELECT 1');
        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully connected to the database' }),
        };
    } catch (error) {
        console.error('Failed to connect to the database', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to connect to the database' }),
        };
    }
};
