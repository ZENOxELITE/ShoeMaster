
<?php
session_start();

// Include the database configuration
require_once 'database_config.php';

// Initialize database
$db = new DatabaseConfig();

// Get featured products
$featuredProducts = $db->getFeaturedProducts();
$categories = $db->getCategories();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STRIDE - Athletic Footwear</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .product-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .product-card h3 { margin: 0 0 10px 0; color: #333; }
        .product-card .price { font-size: 18px; font-weight: bold; color: #e74c3c; }
        .product-card .category { color: #666; font-size: 14px; }
        .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #2980b9; }
        .navigation { background: #2c3e50; color: white; padding: 15px; margin: -20px -20px 20px -20px; }
        .navigation a { color: white; text-decoration: none; margin-right: 20px; }
        .test-db { background: #e8f5e8; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="navigation">
        <strong>STRIDE</strong>
        <a href="index.php">Home</a>
        <a href="connect.php">Test Database</a>
        <a href="api.php">API</a>
    </div>

    <div class="container">
        <div class="header">
            <h1>STRIDE - Athletic Footwear Store</h1>
            <p>Premium athletic shoes for every activity</p>
        </div>

        <div class="test-db">
            <strong>Database Status:</strong> Connected to stride_db MySQL database successfully! 
            <a href="connect.php" class="btn">Test Database Connection</a>
        </div>

        <h2>Featured Products</h2>
        <div class="products-grid">
            <?php if (empty($featuredProducts)): ?>
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <p>No products found. <a href="connect.php">Initialize database with sample data</a></p>
                </div>
            <?php else: ?>
                <?php foreach ($featuredProducts as $product): ?>
                    <div class="product-card">
                        <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                        <p class="category"><?php echo htmlspecialchars($product['category_name'] ?? 'Uncategorized'); ?></p>
                        <p><?php echo htmlspecialchars($product['description']); ?></p>
                        <div class="price">$<?php echo number_format($product['price'], 2); ?></div>
                        <br>
                        <button class="btn" onclick="addToCart(<?php echo $product['id']; ?>)">Add to Cart</button>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <h2>Categories</h2>
        <div class="products-grid">
            <?php foreach ($categories as $category): ?>
                <div class="product-card">
                    <h3><?php echo htmlspecialchars($category['name']); ?></h3>
                    <p><?php echo htmlspecialchars($category['description']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        function addToCart(productId) {
            fetch('api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'add_to_cart',
                    product_id: productId,
                    quantity: 1,
                    size: 'M',
                    color: 'Black'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product added to cart!');
                } else {
                    alert('Error adding to cart: ' + data.message);
                }
            });
        }
    </script>
</body>
</html>
