<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, name, email, role, phone, status, created_at FROM users ORDER BY created_at DESC");
        $rows = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $rows]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
