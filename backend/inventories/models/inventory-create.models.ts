export const createInventoryTableQuery = `
  CREATE TABLE IF NOT EXISTS inventory (
    id CHAR(64) NOT NULL,

    mediater_id CHAR(64) NOT NULL,

    orders JSON NOT NULL,

    location VARCHAR(100),

    is_final_stop BOOLEAN DEFAULT FALSE,

    recieved_at DATETIME,

    released_at DATETIME,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_inventory_mediater_id (mediater_id),
    INDEx idx_inventory_is_final_stop (is_final_stop)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
