-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazone_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (

    -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT(10) AUTO_INCREMENT NOT NULL,
    -- Makes a string column called "product_name" which cannot contain null --
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    -- Cost to customer - "price" --
    price DECIMAL(10, 2),
    -- How much of the product is availale in the store --
    stock_quantity INT(200),
    -- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY(id)
);
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("LEGO duplo alphabet train", "Toys and Games", 15.99, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("LEGO creator Dinosaurus", "Toys and Games", 11.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Cutting board, set of three", "Kitchen and Dining", 10.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Steel mixing bowls, set of 6", "Kitchen and Dining", 24.49, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Chef knife", "Kitchen and Dining", 13.99, 61);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Paper towels", "Health and Household", 19.99, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Tissue paper", "Health and Household", 8.99, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toilet paper", "Health and Household", 21.99, 39);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pistachios", "Grocery", 11.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Mineral water", "Grocery", 5.99, 84);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Apple juice", "Grocery", 4.49, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Board game", "Toys and Games", 7.79, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toothpaste", "Health and Household", 4.19, 7);





