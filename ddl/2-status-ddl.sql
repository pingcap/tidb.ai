CREATE TABLE status
(
    status_name  VARCHAR(100) NOT NULL PRIMARY KEY,
    status_type  ENUM('number', 'string', 'object', 'array', 'date') NOT NULL,
    status_value JSON NULL
);

INSERT INTO status (status_name, status_type, status_value)
VALUES ('last_preload_at', 'date', '"1970-01-01"');