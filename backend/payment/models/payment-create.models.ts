export const createPaymentTableQuery = `
  CREATE TABLE IF NOT EXISTS payment (
    id CHAR(64) NOT NULL,

    user_id CHAR(64) NOT NULL,

    order_id CHAR(64) NOT NULL UNIQUE,

    transaction_id CHAR(64) UNIQUE,

    amount DECIMAL(10,2) NOT NULL,

    mode ENUM('UPI', 'CARD', 'CASH'),

    status ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_payment_user_id (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
