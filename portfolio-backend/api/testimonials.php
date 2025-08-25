<?php
// api/testimonials.php
include_once __DIR__ . '/../core/initialize.php';

// Re-establish DB connection since it's not included in initialize.php anymore
$db = (new Database())->connect();

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

// --- Public Routes (No session required) ---
if ($method === 'GET' && $action === 'validate_token') {
    $token = $_GET['token'] ?? '';
    $query = 'SELECT * FROM testimonial_requests WHERE token = :token AND is_used = 0';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Token is valid.']);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Invalid or expired link. Please request a new one.']);
    }
    exit();
}

if ($method === 'GET' && $action === 'get_approved') {
    $query = 'SELECT name, title, quote, image_url, rating FROM testimonials WHERE status = "Approved" ORDER BY created_at DESC';
    $stmt = $db->prepare($query);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit();
}

if ($method === 'POST' && $action === 'submit') {
    $token = $data->token ?? '';
    // Re-validate the token before submission
    $query_validate = 'SELECT id FROM testimonial_requests WHERE token = :token AND is_used = 0';
    $stmt_validate = $db->prepare($query_validate);
    $stmt_validate->bindParam(':token', $token);
    $stmt_validate->execute();
    
    if ($stmt_validate->rowCount() > 0) {
        $request = $stmt_validate->fetch(PDO::FETCH_ASSOC);
        $requestId = $request['id'];

        // Insert the new testimonial
        $query_insert = 'INSERT INTO testimonials (name, email, title, quote, rating, project_reference) 
                         VALUES (:name, :email, :title, :quote, :rating, :project_reference)';
        $stmt_insert = $db->prepare($query_insert);
        $stmt_insert->bindParam(':name', $data->name);
        $stmt_insert->bindParam(':email', $data->email);
        $stmt_insert->bindParam(':title', $data->title);
        $stmt_insert->bindParam(':quote', $data->quote);
        $stmt_insert->bindParam(':rating', $data->rating, PDO::PARAM_INT);
        $stmt_insert->bindParam(':project_reference', $data->project_reference);
        
        if ($stmt_insert->execute()) {
            // Mark the token as used
            $query_update = 'UPDATE testimonial_requests SET is_used = 1 WHERE id = :id';
            $stmt_update = $db->prepare($query_update);
            $stmt_update->bindParam(':id', $requestId);
            $stmt_update->execute();
            
            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Testimonial submitted for review!']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to submit testimonial.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'This link has already been used or is invalid.']);
    }
    exit();
}


// --- Admin Routes (Protected by session check) ---
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit(json_encode(['message' => 'Authentication required.']));
}

if ($method === 'POST' && $action === 'generate_link') {
    $token = bin2hex(random_bytes(32));
    $query = 'INSERT INTO testimonial_requests (token) VALUES (:token)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':token', $token);
    if ($stmt->execute()) {
        $link = "http://localhost:5173/submit-testimonial/" . $token;
        echo json_encode(['success' => true, 'link' => $link]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to generate link.']);
    }
}

if ($method === 'GET' && $action === 'get_all') {
    $query = 'SELECT * FROM testimonials ORDER BY created_at DESC';
    $stmt = $db->prepare($query);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'PUT' && $action === 'update_status') {
    $data = json_decode(file_get_contents("php://input"));
    $query = 'UPDATE testimonials SET status = :status WHERE id = :id';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':status', $data->status);
    $stmt->bindParam(':id', $data->id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Status updated.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to update status.']);
    }
}
?>