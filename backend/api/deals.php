<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

if ($method === 'GET') {
    $stage = $_GET['stage'] ?? null;
    $owner = $_GET['owner'] ?? null;

    $query = "SELECT * FROM deals WHERE 1=1";
    $params = [];

    if ($stage && $stage !== 'all') {
        $query .= " AND stage = ?";
        $params[] = $stage;
    }

    if ($owner && $owner !== 'All owners') {
        $query .= " AND owner = ?";
        $params[] = $owner;
    }

    $query .= " ORDER BY created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $mapped = array_map(function($r) {
            return [
                'id' => $r['deal_code'] ?: ('deal-' . $r['id']),
                'dbId' => (int)$r['id'],
                'name' => $r['name'] ?: $r['customer'],
                'customer' => $r['customer'],
                'projectType' => $r['project_type'],
                'value' => (int)$r['value'],
                'stage' => $r['stage'],
                'tag' => $r['tag'] ?: '',
                'tagColor' => $r['tag_color'] ?: 'blue',
                'owner' => $r['owner'] ?: 'Rahul',
                'createdAt' => $r['created_at'],
            ];
        }, $rows);

        echo json_encode(['success' => true, 'data' => $mapped]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    $customer = trim($input['customer'] ?? ($input['name'] ?? ''));
    $projectType = trim($input['projectType'] ?? ($input['project_type'] ?? ''));
    $value = (int)($input['value'] ?? 0);
    $stage = trim($input['stage'] ?? 'qualified');
    $tag = trim($input['tag'] ?? '');
    $tagColor = trim($input['tagColor'] ?? ($input['tag_color'] ?? 'blue'));
    $owner = trim($input['owner'] ?? 'Rahul');
    $dealCode = 'deal-' . time();

    if (empty($customer) || empty($projectType)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Customer and project type are required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO deals (deal_code, name, customer, project_type, value, stage, tag, tag_color, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$dealCode, $customer, $customer, $projectType, $value, $stage, $tag, $tagColor, $owner]);
        $id = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM deals WHERE id = ?");
        $fetchStmt->execute([$id]);
        $r = $fetchStmt->fetch();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'data' => [
                'id' => $r['deal_code'] ?: ('deal-' . $r['id']),
                'dbId' => (int)$r['id'],
                'name' => $r['name'],
                'customer' => $r['customer'],
                'projectType' => $r['project_type'],
                'value' => (int)$r['value'],
                'stage' => $r['stage'],
                'tag' => $r['tag'],
                'tagColor' => $r['tag_color'],
                'owner' => $r['owner'],
                'createdAt' => $r['created_at'],
            ]
        ]);
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
        echo json_encode(['success' => false, 'message' => 'Deal id is required']);
        exit();
    }

    $stage = $input['stage'] ?? null;
    $value = isset($input['value']) ? (int)$input['value'] : null;
    $owner = $input['owner'] ?? null;

    $fields = [];
    $params = [];
    if ($stage) { $fields[] = "stage = ?"; $params[] = $stage; }
    if ($value !== null) { $fields[] = "value = ?"; $params[] = $value; }
    if ($owner) { $fields[] = "owner = ?"; $params[] = $owner; }

    if (empty($fields)) {
        echo json_encode(['success' => true, 'message' => 'No fields to update']);
        exit();
    }

    $params[] = $id;
    $params[] = $id;
    $sql = "UPDATE deals SET " . implode(', ', $fields) . " WHERE id = ? OR deal_code = ?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode(['success' => true, 'message' => 'Deal updated']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
