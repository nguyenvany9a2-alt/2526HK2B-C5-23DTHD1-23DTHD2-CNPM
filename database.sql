CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY,
    username NVARCHAR(50),
    password NVARCHAR(100)
);

CREATE TABLE Products (
    id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(100),
    price FLOAT,
    description NVARCHAR(255),
    image NVARCHAR(255)
);

<<<<<<< HEAD
=======
CREATE TABLE Cart (
    id INT PRIMARY KEY IDENTITY,
    user_id INT,
    product_id INT,
    quantity INT
);

>>>>>>> feature/CNPM-01-database-fix
CREATE TABLE Orders (
    id INT PRIMARY KEY IDENTITY,
    user_id INT,
    total FLOAT
);