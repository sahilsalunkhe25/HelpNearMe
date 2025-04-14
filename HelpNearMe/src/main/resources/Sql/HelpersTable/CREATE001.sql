CREATE TABLE helpers (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    phone           TEXT NOT NULL,
    profession      TEXT NOT NULL,
    pincode         TEXT NOT NULL,
    city            TEXT NOT NULL,
    address         TEXT,
    photo_url       TEXT,
    added_by        TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating_total    INTEGER DEFAULT 0,
    rating_count    INTEGER DEFAULT 0
);
