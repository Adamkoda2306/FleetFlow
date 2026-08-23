export const createNotificationTableQuery = `
  CREATE TABLE IF NOT EXISTS notification (
    id CHAR(64) NOT NULL,

    recipient_id CHAR(64) NOT NULL,

    title VARCHAR(64) NOT NULL,

    message VARCHAR(255) NOT NULL,

    is_sent BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_notification_recipient_id (recipient_id),
    INDEX idx_notification_is_sent (is_sent)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
`;
