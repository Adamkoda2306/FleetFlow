export const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS \`users-main\` (
    id CHAR(64) NOT NULL,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE,

    phonenumber VARCHAR(20) UNIQUE,

    role ENUM('USER', 'ADMIN', 'MEDIATER') NOT NULL DEFAULT 'USER',

    is_active BOOLEAN DEFAULT TRUE,

    fcm_token VARCHAR(512),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;


export const createAddressTableQuery = `
  CREATE TABLE IF NOT EXISTS \`users-address\` (
    id CHAR(64) NOT NULL,

    user_id VARCHAR(100) NOT NULL,

    address_line1 VARCHAR(255) NOT NULL,

    address_line2 VARCHAR(255),

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    country VARCHAR(100) NOT NULL DEFAULT 'India',

    pincode VARCHAR(10) NOT NULL,

    longitude DECIMAL(10, 7) NOT NULL,

    latitude DECIMAL(10, 7) NOT NULL,

    type ENUM('HOME', 'OFFICE', 'OTHERS') NOT NULL DEFAULT 'HOME',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_users_address_user_id (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;

export const createHistoryTableQuery = `
  CREATE TABLE IF NOT EXISTS \`users-history\` (
    id CHAR(64) NOT NULL,

    user_id VARCHAR(100) NOT NULL,

    payment_id VARCHAR(100) NOT NULL UNIQUE,

    order_id VARCHAR(100) NOT NULL UNIQUE,

    status ENUM(
      'CREATED',
      'CONFIRMED',
      'PICKED_UP',
      'IN_TRANSIT',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'CANCELLED',
      'FAILED'
    ) NOT NULL DEFAULT 'CREATED',

    order_at DATETIME,

    received_at DATETIME,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_users_history_user_id (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;