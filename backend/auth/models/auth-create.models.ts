export const createAuthTableQuery = `
  CREATE TABLE IF NOT EXISTS auth (
    user_id CHAR(64) NOT NULL UNIQUE,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE,

    password_hash VARCHAR(255),

    phonenumber VARCHAR(20) UNIQUE,

    otp VARCHAR(255),

    otp_expires_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
