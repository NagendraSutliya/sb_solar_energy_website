<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

if ($method === 'GET') {
    $section = $_GET['section'] ?? null;

    $query = "SELECT * FROM tasks WHERE 1=1";
    $params = [];

    if ($section) {
        $query .= " AND section = ?";
        $params[] = $section;
    }

    $query .= " ORDER BY completed ASC, created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $mapped = array_map(function($r) {
            return [
                'id' => (string)$r['id'],
                'dbId' => (int)$r['id'],
                'title' => $r['title'],
                'subtitle' => $r['subtitle'] ?: ($r['time'] ?: 'Today'),
                'time' => $r['time'] ?: $r['subtitle'],
                'type' => $r['type'] ?: 'Task',
                'section' => $r['section'] ?: 'today',
                'completed' => (bool)$r['completed'],
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
    $title = trim($input['title'] ?? '');
    $subtitle = trim($input['subtitle'] ?? ($input['time'] ?? 'Today'));
    $time = trim($input['time'] ?? $subtitle);
    $type = trim($input['type'] ?? 'Task');
    $section = trim($input['section'] ?? 'today');
    $completed = !empty($input['completed']) ? 1 : 0;

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Task title is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO tasks (title, subtitle, time, type, section, completed) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $subtitle, $time, $type, $section, $completed]);
        $id = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM tasks WHERE id = ?");
        $fetchStmt->execute([$id]);
        $r = $fetchStmt->fetch();

        echo json_encode([
            'success' => true,
            'data' => [
                'id' => (string)$r['id'],
                'dbId' => (int)$r['id'],
                'title' => $r['title'],
                'subtitle' => $r['subtitle'],
                'time' => $r['time'],
                'type' => $r['type'],
                'section' => $r['section'],
                'completed' => (bool)$r['completed'],
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
        echo json_encode(['success' => false, 'message' => 'Task id is required']);
        exit();
    }

    $completed = isset($input['completed']) ? ($input['completed'] ? 1 : 0) : null;
    $title = $input['title'] ?? null;
    $section = $input['section'] ?? null;

    $fields = [];
    $params = [];
    if ($completed !== null) { $fields[] = "completed = ?"; $params[] = $completed; }
    if ($title !== null) { $fields[] = "title = ?"; $params[] = $title; }
    if ($section !== null) { $fields[] = "section = ?"; $params[] = $section; }

    if (empty($fields)) {
        echo json_encode(['success' => true, 'message' => 'No fields to update']);
        exit();
    }

    $params[] = $id;
    $sql = "UPDATE tasks SET " . implode(', ', $fields) . " WHERE id = ?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode(['success' => true, 'message' => 'Task updated']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
