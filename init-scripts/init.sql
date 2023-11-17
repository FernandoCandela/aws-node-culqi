CREATE TABLE IF NOT EXISTS tokens (
    id serial PRIMARY KEY,
    token VARCHAR(16) UNIQUE NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    expiration_month VARCHAR NOT NULL,
    expiration_year VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expiration_time TIMESTAMPTZ
);
