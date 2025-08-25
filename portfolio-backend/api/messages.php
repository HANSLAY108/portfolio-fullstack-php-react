<?php
// api/messages.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/Message.php';

$message = new Message($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': // Admin only
        if (!isset($_SESSION['user_id'])) { http_response_code(401); exit(json_encode(['message' => 'Authentication required.'])); }
        $result = $message->read();
        $messages_arr = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) { array_push($messages_arr, $row); }
        echo json_encode($messages_arr);
        break;

    case 'POST': // Public
        $data = json_decode(file_get_contents("php://input"));
        $message->name = $data->name;
        $message->email = $data->email;
        $message->message = $data->message;
        $message->subject = substr($data->message, 0, 50) . '...';
        if ($message->create()) { http_response_code(201); echo json_encode(['message' => 'Message Sent.']); } 
        else { http_response_code(503); echo json_encode(['message' => 'Unable to send message.']); }
        break;

    case 'PUT': // Admin only
        if (!isset($_SESSION['user_id'])) { http_response_code(401); exit(json_encode(['message' => 'Authentication required.'])); }
        $data = json_decode(file_get_contents("php://input"));
        $message->id = $data->id;
        $message->status = $data->status;
        if ($message->updateStatus()) { echo json_encode(['message' => 'Message status updated.']); } 
        else { echo json_encode(['message' => 'Failed to update status.']); }
        break;

    case 'DELETE': // Admin only
        if (!isset($_SESSION['user_id'])) { http_response_code(401); exit(json_encode(['message' => 'Authentication required.'])); }
        $data = json_decode(file_get_contents("php://input"));
        $message->id = $data->id;
        if ($message->delete()) { echo json_encode(['message' => 'Message Deleted.']); } 
        else { echo json_encode(['message' => 'Failed to delete message.']); }
        break;
}
?>