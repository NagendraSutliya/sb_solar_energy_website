<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $email = $_GET['email'] ?? null;
    $status = $_GET['status'] ?? null;

    $query = "SELECT * FROM complaints WHERE 1=1";
    $params = [];

    if ($email) {
        $query .= " AND customer_email = ?";
        $params[] = $email;
    }
    if ($status) {
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

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Complaint lodged successfully.',
            'data' => [
                'id' => $pdo->lastInsertId(),
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

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
