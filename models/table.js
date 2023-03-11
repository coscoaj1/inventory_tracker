// create a new table in postgresql database with id, product_name, sku, location, count, image, and awskey fields
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    sku INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL,
    image VARCHAR(255) NULL,
    awskey VARCHAR(255) NULL
);
