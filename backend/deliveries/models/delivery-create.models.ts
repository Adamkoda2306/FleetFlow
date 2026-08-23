export const createDeliveryTableQuery = `
  CREATE TABLE IF NOT EXISTS delivery (
    id CHAR(64) NOT NULL,

    mediater_id CHAR(64) NOT NULL,

    inventory_id CHAR(64) NOT NULL,

    status ENUM('ASSIGNED', 'STARTED', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'ASSIGNED',

    location VARCHAR(100),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_delivery_mediater_id (mediater_id),
    INDEX idx_delivery_inventory_id (inventory_id),
    INDEX idx_delivery_status (status)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
