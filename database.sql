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

CREATE TABLE Orders (
    id INT PRIMARY KEY IDENTITY,
    user_id INT,
    total FLOAT
);