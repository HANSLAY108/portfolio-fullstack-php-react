<?php
// api/settings.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/Setting.php';

$setting = new Setting($db);
$action = $_POST['action'] ?? ''; // Get action from POST data

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': // Publicly get settings
        $settings_data = $setting->read();
        if ($settings_data) {
            echo json_encode($settings_data);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Settings not found.']);
        }
        break;

    case 'POST': // Admin updates
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            exit(json_encode(['message' => 'Authentication required.']));
        }

        switch ($action) {
            case 'update_logo':
                if (isset($_FILES['logo']) && $_FILES['logo']['error'] == 0) {
                    $uploadDir = __DIR__ . '/../uploads/logos/';
                    if (!file_exists($uploadDir)) { mkdir($uploadDir, 0777, true); }
                    $fileName = 'logo_' . time() . '_' . basename($_FILES['logo']['name']);
                    $targetPath = $uploadDir . $fileName;
                    if (move_uploaded_file($_FILES['logo']['tmp_name'], $targetPath)) {
                        $logoUrl = '/uploads/logos/' . $fileName;
                        if ($setting->updateField('logo_url', $logoUrl)) {
                            echo json_encode(['message' => 'Logo updated', 'logo_url' => $logoUrl]);
                        } else { http_response_code(500); echo json_encode(['message' => 'Database error.']); }
                    } else { http_response_code(500); echo json_encode(['message' => 'File move error.']); }
                } else { http_response_code(400); echo json_encode(['message' => 'No file uploaded.']); }
                break;

            case 'update_theme':
                $accentColor = $_POST['accentColor'] ?? '#8B5CF6';
                if ($setting->updateField('accent_color', $accentColor)) {
                    echo json_encode(['message' => 'Theme updated']);
                } else { http_response_code(500); echo json_encode(['message' => 'DB error.']); }
                break;

            case 'update_contact':
                $contactEmail = $_POST['contactEmail'] ?? '';
                $contactPhone = $_POST['contactPhone'] ?? '';
                $setting->updateField('contact_email', $contactEmail);
                $setting->updateField('contact_phone', $contactPhone);
                echo json_encode(['message' => 'Contact details updated']);
                break;
            
            default:
                http_response_code(400);
                echo json_encode(['message' => 'Invalid action specified.']);
                break;
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed.']);
        break;
}
?>