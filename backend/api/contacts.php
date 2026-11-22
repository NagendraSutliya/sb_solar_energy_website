<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

function computeInitials($name = '') {
    $parts = preg_split('/\s+/', trim($name));
    $initials = '';
    foreach (array_slice($parts, 0, 2) as $p) {
        $initials .= strtoupper(mb_substr($p, 0, 1));
    }
    return $initials ?: 'C';
}

if ($method === 'GET') {
    $tag = $_GET['tag'] ?? null;
    $search = $_GET['search'] ?? null;

    $query = "SELECT * FROM contacts WHERE 1=1";
    $params = [];

    if ($tag && $tag !== 'All') {
        $query .= " AND tag = ?";
        $params[] = $tag;
    }

    if ($search) {
        $query .= " AND (name LIKE ? OR city LIKE ? OR phone LIKE ? OR email LIKE ?)";
        $s = "%{$search}%";
        $params[] = $s;
        $params[] = $s;
        $params[] = $s;
        $params[] = $s;
    }

    $query .= " ORDER BY created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $rows]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    $name = trim($input['name'] ?? '');
    $city = trim($input['city'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $tag = trim($input['tag'] ?? 'Lead');
    $initials = $input['initials'] ?? computeInitials($name);

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Name is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, initials, city, phone, email, tag) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $initials, $city, $phone, $email, $tag]);
        $id = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
        $fetchStmt->execute([$id]);
        echo json_encode(['success' => true, 'data' => $fetchStmt->fetch()]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
