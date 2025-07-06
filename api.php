
<?php
header('Content-Type: application/json');
session_start();

// Include the database configuration
require_once 'database_config.php';

// Initialize database
$db = new DatabaseConfig();

// Get the request method and data
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Generate session ID if not exists
if (!isset($_SESSION['cart_session'])) {
    $_SESSION['cart_session'] = session_id();
}

$response = ['success' => false, 'message' => '', 'data' => null];

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['action'])) {
                switch ($_GET['action']) {
                    case 'products':
                        $response['data'] = $db->getProducts();
                        $response['success'] = true;
                        break;
                    
                    case 'featured':
                        $response['data'] = $db->getFeaturedProducts();
                        $response['success'] = true;
                        break;
                    
                    case 'categories':
                        $response['data'] = $db->getCategories();
                        $response['success'] = true;
                        break;
                    
                    case 'cart':
                        $response['data'] = $db->getCartItems($_SESSION['cart_session']);
                        $response['success'] = true;
                        break;
                    
                    case 'product':
                        if (isset($_GET['id'])) {
                            $response['data'] = $db->getProduct(intval($_GET['id']));
                            $response['success'] = true;
                        } else {
                            $response['message'] = 'Product ID required';
                        }
                        break;
                    
                    default:
                        $response['message'] = 'Unknown action';
                }
            } else {
                $response['message'] = 'Action parameter required';
            }
            break;
        
        case 'POST':
            if (isset($input['action'])) {
                switch ($input['action']) {
                    case 'add_to_cart':
                        if (isset($input['product_id'])) {
                            $result = $db->addToCart(
                                $_SESSION['cart_session'],
                                intval($input['product_id']),
                                intval($input['quantity'] ?? 1),
                                $input['size'] ?? '',
                                $input['color'] ?? ''
                            );
                            
                            if ($result) {
                                $response['success'] = true;
                                $response['message'] = 'Item added to cart';
                            } else {
                                $response['message'] = 'Failed to add item to cart';
                            }
                        } else {
                            $response['message'] = 'Product ID required';
                        }
                        break;
                    
                    default:
                        $response['message'] = 'Unknown action';
                }
            } else {
                $response['message'] = 'Action parameter required';
            }
            break;
        
        default:
            $response['message'] = 'Method not allowed';
    }
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
}

echo json_encode($response);
?>
