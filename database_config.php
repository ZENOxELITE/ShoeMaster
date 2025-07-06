
<?php
class DatabaseConfig {
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "stride_db";
    private $conn;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    // Get all products
    public function getProducts() {
        $sql = "SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id";
        $result = $this->conn->query($sql);
        
        $products = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }

    // Get featured products
    public function getFeaturedProducts() {
        $sql = "SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_featured = 1";
        $result = $this->conn->query($sql);
        
        $products = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        return $products;
    }

    // Get product by ID
    public function getProduct($id) {
        $stmt = $this->conn->prepare("SELECT p.*, c.name as category_name FROM products p 
                                     LEFT JOIN categories c ON p.category_id = c.id 
                                     WHERE p.id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    // Get all categories
    public function getCategories() {
        $sql = "SELECT * FROM categories";
        $result = $this->conn->query($sql);
        
        $categories = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
        }
        return $categories;
    }

    // Add item to cart
    public function addToCart($session_id, $product_id, $quantity, $size, $color) {
        $stmt = $this->conn->prepare("INSERT INTO cart_items (session_id, product_id, quantity, size, color) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("siiss", $session_id, $product_id, $quantity, $size, $color);
        return $stmt->execute();
    }

    // Get cart items
    public function getCartItems($session_id) {
        $stmt = $this->conn->prepare("SELECT ci.*, p.name, p.price, p.image_url 
                                     FROM cart_items ci 
                                     JOIN products p ON ci.product_id = p.id 
                                     WHERE ci.session_id = ?");
        $stmt->bind_param("s", $session_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $items = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
        }
        return $items;
    }

    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
}
?>
