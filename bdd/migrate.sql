DROP TABLE IF EXISTS T_categories;
CREATE TABLE T_categories
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    description VARCHAR(1000),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS T_products;
CREATE TABLE T_products
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    price FLOAT(4, 2),
    quantity SMALLINT DEFAULT 0,
    category_id SMALLINT REFERENCES T_categories(id),
    PRIMARY KEY ( id )
);
