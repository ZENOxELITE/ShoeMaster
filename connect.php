<?php
// Database configuration for XAMPP MySQL
$servername = "localhost";
$username = "root";        // Default XAMPP MySQL username
$password = "";            // Default XAMPP MySQL password (empty)
$dbname = "stride_db";     // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully to MySQL database!";

// Example: Create tables if they don't exist
$sql_categories = "CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql_products = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)";

$sql_cart_items = "CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(50),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
)";

// Execute table creation queries
if ($conn->query($sql_categories) === TRUE) {
    echo "<br>Categories table created successfully";
} else {
    echo "<br>Error creating categories table: " . $conn->error;
}

if ($conn->query($sql_products) === TRUE) {
    echo "<br>Products table created successfully";
} else {
    echo "<br>Error creating products table: " . $conn->error;
}

if ($conn->query($sql_cart_items) === TRUE) {
    echo "<br>Cart items table created successfully";
} else {
    echo "<br>Error creating cart items table: " . $conn->error;
}

// Function to test database operations
function testDatabase($conn) {
    // Insert sample category
    $stmt = $conn->prepare("INSERT IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)");
    $name = "Athletic Shoes";
    $slug = "athletic-shoes";
    $desc = "High-performance athletic footwear";
    $stmt->bind_param("sss", $name, $slug, $desc);
    $stmt->execute();

    // Insert sample product
    $stmt = $conn->prepare("INSERT IGNORE INTO products (name, description, price, category_id, is_featured) VALUES (?, ?, ?, ?, ?)");
    $prod_name = "Nike Air Max";
    $prod_desc = "Comfortable running shoes";
    $price = 129.99;
    $cat_id = 1;
    $featured = true;
    $stmt->bind_param("ssdii", $prod_name, $prod_desc, $price, $cat_id, $featured);
    $stmt->execute();

    echo "<br>Sample data inserted successfully";
    $stmt->close();
}

// Test the database
testDatabase($conn);

// Close connection
$conn->close();
?>