<?php
/**
 * SB Solar Energy - MySQL Database Connection Configuration (MilesWeb / cPanel)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// MilesWeb / cPanel Database Settings
// Update DB_USER and DB_PASSWORD with your credentials from cPanel -> MySQL Databases
$db_host = 'localhost';
$db_name = 'rrindia_1_sbSolar'; // As seen in your phpMyAdmin
$db_user = 'rrindia_1_nks'; // Replace with your created database username if different
$db_pass = 'SBsolar@12345';                  // Enter your MySQL database password here

try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // If connection fails, return clear JSON error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage(),
        'hint' => 'Please check db_user and db_pass inside api/db.php with your MilesWeb credentials.'
    ]);
    exit();
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}
