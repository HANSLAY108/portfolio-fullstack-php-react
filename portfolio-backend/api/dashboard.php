<?php
// api/dashboard.php
include_once __DIR__ . '/../core/initialize.php';
include_once __DIR__ . '/../models/Project.php';
include_once __DIR__ . '/../models/Message.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit(json_encode(['message' => 'Authentication required.']));
}

$project = new Project($db);
$message = new Message($db);

$totalProjects = $project->getCount();
$totalMessages = $message->getCount();
$recentProjectsStmt = $project->read();

$recentActivity = [];
$count = 0;
while ($row = $recentProjectsStmt->fetch(PDO::FETCH_ASSOC)) {
    if ($count++ >= 5) break;
    $iso_time = date(DATE_ISO8601, strtotime($row['created_at']));
    $recentActivity[] = [
        'type' => 'Project Update',
        'text' => "Project '" . $row['title'] . "' was recently updated.",
        'time' => $iso_time
    ];
}

$dashboard_data = [
    'stats' => [
        'totalProjects' => (int)$totalProjects,
        'projectsInProgress' => 4, // Placeholder
        'completedProjects' => (int)$totalProjects > 4 ? (int)$totalProjects - 4 : 0,
    ],
    'projectUpdates' => $recentActivity,
    'teamActivity' => []
];

http_response_code(200);
echo json_encode($dashboard_data);
?>