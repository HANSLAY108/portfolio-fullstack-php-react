<?php
// core/initialize.php

// --- ERROR REPORTING ---
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- HEADERS ---
// We must specify the exact origin. Using a wildcard '*' with credentials is not allowed.
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
// Allow the Content-Type header, which is essential for POST/PUT requests
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// Allow cookies to be sent with requests (for sessions)
header('Access-Control-Allow-Credentials: true');

// The browser sends a pre-flight OPTIONS request to check permissions.
// We must handle this and send back a 200 OK response.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- SESSION MANAGEMENT ---
// Start the session *after* handling the OPTIONS request.
session_start();

// --- JSON CONTENT TYPE ---
header('Content-Type: application/json; charset=UTF-8');

// --- DATABASE CONNECTION ---
include_once __DIR__ . '/../config/Database.php';

try {
    $database = new Database();
    $db = $database->connect();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}
?>