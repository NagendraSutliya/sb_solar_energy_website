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
    return $initials ?: 'L';
}

if ($method === 'GET') {
    $status = $_GET['status'] ?? null;
    $search = $_GET['search'] ?? null;

    $query = "SELECT * FROM leads WHERE 1=1";
    $params = [];

    if ($status && $status !== 'All') {
        $query .= " AND status = ?";
        $params[] = $status;
    }

    if ($search) {
        $query .= " AND (name LIKE ? OR city LIKE ? OR phone LIKE ? OR interest LIKE ?)";
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
    $interest = trim($input['interest'] ?? '');
    $city = trim($input['city'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $source = trim($input['source'] ?? 'Website form');
    $status = trim($input['status'] ?? 'New');
    $assigned = trim($input['assigned'] ?? 'Unassigned');
    $notes = trim($input['notes'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Lead name is required']);
        exit();
    }

    $initials = $input['initials'] ?? computeInitials($name);

    try {
        $stmt = $pdo->prepare("INSERT INTO leads (name, initials, source, city, interest, status, assigned, phone, email, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $initials, $source, $city, $interest, $status, $assigned, $phone, $email, $notes]);
        $id = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
        $fetchStmt->execute([$id]);
        $lead = $fetchStmt->fetch();

        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $lead]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? ($input['id'] ?? null);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Lead id is required']);
        exit();
    }

    $fields = [];
    $params = [];
    foreach (['name', 'status', 'city', 'interest', 'assigned', 'phone', 'email', 'notes'] as $f) {
        if (isset($input[$f])) {
            $fields[] = "{$f} = ?";
            $params[] = $input[$f];
        }
    }

    if (empty($fields)) {
        echo json_encode(['success' => true, 'message' => 'No fields to update']);
        exit();
    }

    $params[] = $id;
    $sql = "UPDATE leads SET " . implode(', ', $fields) . " WHERE id = ?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $fetchStmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
        $fetchStmt->execute([$id]);
        $lead = $fetchStmt->fetch();

        echo json_encode(['success' => true, 'data' => $lead]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Lead id is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Lead deleted']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
