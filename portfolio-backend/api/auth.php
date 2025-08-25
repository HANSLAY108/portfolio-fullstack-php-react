<?php
// api/auth.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/User.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($action) {
        case 'logout':
            session_destroy();
            http_response_code(200);
            echo json_encode(['message' => 'Logout successful.']);
            break;
        default: // Handle Login
            $user = new User($db);
            $data = json_decode(file_get_contents("php://input"));

            if (!isset($data->email) || !isset($data->password)) {
                http_response_code(400); exit(json_encode(['message' => 'Email and password are required.']));
            }
            $found_user = $user->findByEmail($data->email);

            if ($found_user && password_verify($data->password, $found_user['password'])) {
                $_SESSION['user_id'] = $found_user['id'];
                $_SESSION['user_name'] = $found_user['name'];
                http_response_code(200);
                echo json_encode(['message' => 'Login successful.', 'user' => ['id' => $found_user['id'], 'name' => $found_user['name'], 'email' => $found_user['email']]]);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Invalid credentials.']);
            }
            break;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'check_session') {
    if (isset($_SESSION['user_id'])) {
        http_response_code(200);
        echo json_encode(['isLoggedIn' => true, 'user' => ['id' => $_SESSION['user_id'], 'name' => $_SESSION['user_name']]]);
    } else {
        http_response_code(200);
        echo json_encode(['isLoggedIn' => false]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request.']);
}
?>