ALTER TABLE chat ADD COLUMN engine_id INT AFTER title;
ALTER TABLE chat ADD COLUMN engine_name VARCHAR(256) AFTER engine_id;