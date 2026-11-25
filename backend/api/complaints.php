<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Helper to extract ID from URL path (e.g., /api/complaints/123 or /api/complaints/123/status)
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($requestUri, PHP_URL_PATH);
$path = trim(str_replace('/api', '', $path), '/');
$segments = explode('/', $path);

$urlId = null;
if (isset($segments[1]) && !empty($segments[1]) && $segments[1] !== 'complaints.php') {
    $urlId = $segments[1];
}

if ($method === 'GET') {
    $email = $_GET['email'] ?? null;
    $status = $_GET['status'] ?? null;
    $id = $_GET['id'] ?? $urlId;

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM complaints WHERE id = ? OR complaint_no = ?");
        $stmt->execute([$id, $id]);
        $row = $stmt->fetch();
        if ($row) {
            echo json_encode(['success' => true, 'data' => $row]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }
        exit();
    }

    $query = "SELECT * FROM complaints WHERE 1=1";
    $params = [];

    if ($email) {
        $query .= " AND customer_email = ?";
        $params[] = $email;
    }
    if ($status && $status !== 'All') {
        $query .= " AND status = ?";
        $params[] = $status;
    }

    $query .= " ORDER BY created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $complaints = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'count' => count($complaints),
            'data' => $complaints
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    $input = getJsonInput();
    $category = $input['category'] ?? '';
    $sub_category = $input['sub_category'] ?? '';
    $nature = $input['nature'] ?? '';
    $description = $input['description'] ?? '';
    $customer_name = $input['customer_name'] ?? 'Customer';
    $customer_email = $input['customer_email'] ?? '';
    $customer_phone = $input['customer_phone'] ?? '';

    if (empty($category) || empty($nature)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Category and nature are required.']);
        exit();
    }

    $complaintNo = 'CMP-' . rand(10000, 99999);

    try {
        $stmt = $pdo->prepare("INSERT INTO complaints (complaint_no, customer_name, customer_email, customer_phone, category, sub_category, nature, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Not Process Yet')");
        $stmt->execute([$complaintNo, $customer_name, $customer_email, $customer_phone, $category, $sub_category, $nature, $description]);
        $newId = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM complaints WHERE id = ?");
        $fetchStmt->execute([$newId]);
        $complaintData = $fetchStmt->fetch();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Complaint lodged successfully.',
            'data' => $complaintData ?: [
                'id' => $newId,
                'complaint_no' => $complaintNo,
                'status' => 'Not Process Yet'
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'PUT') {
    $input = getJsonInput();
    $id = $_GET['id'] ?? ($input['id'] ?? $urlId);

    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Complaint ID is required']);
        exit();
    }

    $status = $input['status'] ?? null;
    $nature = $input['nature'] ?? null;
    $category = $input['category'] ?? null;
    $description = $input['description'] ?? null;

    $fields = [];
    $params = [];

    if ($status !== null) {
        $fields[] = "status = ?";
        $params[] = $status;
    }
    if ($nature !== null) {
        $fields[] = "nature = ?";
        $params[] = $nature;
    }
    if ($category !== null) {
        $fields[] = "category = ?";
        $params[] = $category;
    }
    if ($description !== null) {
        $fields[] = "description = ?";
        $params[] = $description;
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No fields provided to update']);
        exit();
    }

    $sql = "UPDATE complaints SET " . implode(', ', $fields) . " WHERE id = ? OR complaint_no = ?";
    $params[] = $id;
    $params[] = $id;

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $fetchStmt = $pdo->prepare("SELECT * FROM complaints WHERE id = ? OR complaint_no = ?");
        $fetchStmt->execute([$id, $id]);
        $updatedRow = $fetchStmt->fetch();

        echo json_encode([
            'success' => true,
            'message' => 'Complaint updated successfully',
            'data' => $updatedRow
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? $urlId;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Complaint ID is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM complaints WHERE id = ? OR complaint_no = ?");
        $stmt->execute([$id, $id]);
        echo json_encode(['success' => true, 'message' => 'Complaint deleted successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
