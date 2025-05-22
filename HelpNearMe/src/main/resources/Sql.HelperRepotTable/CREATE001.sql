CREATE TABLE HelperReport (
    id SERIAL PRIMARY KEY,
    helper_id BIGINT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    UNIQUE (helper_id, ip_address),
    CONSTRAINT fk_helper
        FOREIGN KEY (helper_id)
        REFERENCES Helpers(id)
        ON DELETE CASCADE
);
