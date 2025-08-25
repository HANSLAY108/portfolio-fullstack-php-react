<?php
// api/profile.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/Profile.php';

$profile = new Profile($db);
$action = $_POST['action'] ?? '';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $profile->read();
        if ($result) {
            $result['skills'] = json_decode($result['skills']);
            $result['social_links'] = json_decode($result['social_links']);
            echo json_encode($result);
        } else { http_response_code(404); echo json_encode(['message' => 'Profile not found.']); }
        break;

    case 'POST':
        if (!isset($_SESSION['user_id'])) { http_response_code(401); exit(json_encode(['message' => 'Authentication required.'])); }
        
        switch ($action) {
            case 'update_text_and_links':
                $profile->tagline = $_POST['tagline'] ?? '';
                $profile->biography = $_POST['biography'] ?? '';
                $profile->skills = $_POST['skills'] ?? '[]';
                $profile->social_links = $_POST['social_links'] ?? '[]';
                if ($profile->updateTextData()) { echo json_encode(['message' => 'Profile details updated.']); } 
                else { http_response_code(500); echo json_encode(['message' => 'Failed to update profile details.']); }
                break;
            case 'update_cv':
                if (isset($_FILES['resume']) && $_FILES['resume']['error'] == 0) {
                    $uploadDir = __DIR__ . '/../uploads/resumes/';
                    if (!file_exists($uploadDir)) { mkdir($uploadDir, 0777, true); }
                    $fileName = 'resume_' . time() . '_' . basename($_FILES['resume']['name']);
                    $targetPath = $uploadDir . $fileName;
                    if (move_uploaded_file($_FILES['resume']['tmp_name'], $targetPath)) {
                        $profile->resume_url = '/uploads/resumes/' . $fileName;
                        if ($profile->updateResumeUrl()) { echo json_encode(['message' => 'CV Updated', 'resume_url' => $profile->resume_url]); } 
                        else { http_response_code(500); echo json_encode(['message' => 'Database error.']); }
                    } else { http_response_code(500); echo json_encode(['message' => 'Failed to move file.']); }
                } else { http_response_code(400); echo json_encode(['message' => 'No file uploaded or upload error.']); }
                break;
            default:
                http_response_code(400); echo json_encode(['message' => 'Invalid action specified.']);
                break;
        }
        break;
}
?>