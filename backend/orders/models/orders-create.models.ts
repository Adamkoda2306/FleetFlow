export const createOrdersTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
    id CHAR(64) NOT NULL,

    user_id CHAR(64) NOT NULL,

    sender_address_id CHAR(64) NOT NULL,

    received_address_id CHAR(64) NOT NULL,

    payment_id CHAR(64) NOT NULL UNIQUE,

    status ENUM('CREATED', 'CONFIRMED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'FAILED') NOT NULL DEFAULT 'CREATED',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    
    INDEX idx_orders_user_id (user_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_payment_id (payment_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
