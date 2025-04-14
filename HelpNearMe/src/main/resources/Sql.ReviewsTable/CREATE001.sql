CREATE TABLE reviews (
    id          SERIAL PRIMARY KEY,
    helper_id   INTEGER NOT NULL REFERENCES helpers(id) ON DELETE CASCADE,
    name        TEXT,
    rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
