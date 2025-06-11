CREATE TABLE reproducts{
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    productSpecifications VARCHAR(255),
    originalPrice DECIMAL(10,2) NOT NULL,
    refurbishedPrice DECIMAL(10,2) NOT NULL,
    partsRepaired VARCHAR(255),
    warrantyPeriod VARCHAR(50);
}