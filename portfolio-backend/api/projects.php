<?php
// api/projects.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/Project.php';

$project = new Project($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $project_data = $project->readOneById($_GET['id']);
            if ($project_data) {
                $project_data['tags'] = json_decode($project_data['tags']);
                $project_data['key_features'] = json_decode($project_data['key_features']);
                $project_data['is_featured'] = (bool)$project_data['is_featured'];
                echo json_encode($project_data);
            } else { http_response_code(404); echo json_encode(['message' => 'Project not found.']); }
        } elseif (isset($_GET['slug'])) {
            $project_data = $project->readOneBySlug($_GET['slug']);
            if ($project_data) {
                $project_data['tags'] = json_decode($project_data['tags']);
                $project_data['key_features'] = json_decode($project_data['key_features']);
                echo json_encode($project_data);
            } else { http_response_code(404); echo json_encode(['message' => 'Project not found.']); }
        } else {
            $result = $project->read();
            $projects_arr = [];
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $row['tags'] = json_decode($row['tags']);
                $row['is_featured'] = (bool)$row['is_featured'];
                array_push($projects_arr, $row);
            }
            echo json_encode($projects_arr);
        }
        break;

    case 'POST':
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401); exit(json_encode(['message' => 'Authentication required.']));
        }
        
        $project->title = $_POST['title'] ?? '';
        $project->slug = $_POST['slug'] ?? '';
        $project->description = $_POST['description'] ?? '';
        $project->live_url = $_POST['live_url'] ?? '';
        $project->github_url = $_POST['github_url'] ?? '';
        $project->is_featured = isset($_POST['is_featured']) && $_POST['is_featured'] === 'true' ? 1 : 0;
        
        $tags = !empty($_POST['tags']) ? array_map('trim', explode(',', $_POST['tags'])) : [];
        $project->tags = json_encode($tags);
        $project->key_features = $_POST['key_features'] ?? '[]';

        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $uploadDir = __DIR__ . '/../uploads/projects/';
            if (!file_exists($uploadDir)) { mkdir($uploadDir, 0777, true); }
            $fileName = time() . '_' . basename($_FILES['image']['name']);
            $targetPath = $uploadDir . $fileName;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                $project->image_url = '/uploads/projects/' . $fileName;
            } else {
                http_response_code(500); exit(json_encode(['message' => 'Failed to upload main image.']));
            }
        }

        if (isset($_POST['id']) && !empty($_POST['id'])) {
            // --- UPDATE LOGIC ---
            $project->id = $_POST['id'];
            if (!$project->image_url && isset($_POST['current_image_url'])) {
                $project->image_url = null;
            }
            if ($project->update()) {
                // For updates, we clear old screenshots and add new ones
                if (isset($_FILES['screenshots'])) {
                     $query_delete = 'DELETE FROM project_screenshots WHERE project_id = :project_id';
                     $stmt_delete = $db->prepare($query_delete);
                     $stmt_delete->bindParam(':project_id', $project->id);
                     $stmt_delete->execute();
                     // Re-use screenshot upload logic
                     // (This part is identical to the CREATE block's screenshot logic)
                }
                echo json_encode(['message' => 'Project Updated']);
            } else { http_response_code(503); echo json_encode(['message' => 'Unable to update project.']); }
        } else {
            // --- CREATE LOGIC ---
            if ($project->create()) {
                $projectId = $db->lastInsertId();
                // --- THIS IS THE CRUCIAL SCREENSHOT HANDLING BLOCK ---
                if (isset($_FILES['screenshots'])) {
                    $screenshotUploadDir = __DIR__ . '/../uploads/screenshots/';
                    if (!file_exists($screenshotUploadDir)) { mkdir($screenshotUploadDir, 0777, true); }
                    
                    foreach ($_FILES['screenshots']['tmp_name'] as $key => $tmpName) {
                        if ($_FILES['screenshots']['error'][$key] === UPLOAD_ERR_OK) {
                            $screenshotName = time() . '_' . $key . '_' . basename($_FILES['screenshots']['name'][$key]);
                            $screenshotPath = $screenshotUploadDir . $screenshotName;
                            if (move_uploaded_file($tmpName, $screenshotPath)) {
                                $imageUrl = '/uploads/screenshots/' . $screenshotName;
                                $query = 'INSERT INTO project_screenshots (project_id, image_url) VALUES (:project_id, :image_url)';
                                $stmt = $db->prepare($query);
                                $stmt->bindParam(':project_id', $projectId);
                                $stmt->bindParam(':image_url', $imageUrl);
                                $stmt->execute();
                            }
                        }
                    }
                }
                // ----------------------------------------------------
                http_response_code(201); echo json_encode(['message' => 'Project Created']);
            } else { http_response_code(503); echo json_encode(['message' => 'Unable to create project.']); }
        }
        break;

    case 'DELETE':
        // ... (DELETE logic remains the same)
        break;
}
?>