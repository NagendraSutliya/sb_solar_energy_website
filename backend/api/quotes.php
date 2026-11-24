<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM quotes ORDER BY created_at DESC");
        $rows = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $rows]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    $fullName = trim($input['fullName'] ?? ($input['full_name'] ?? ''));
    $phone = trim($input['phone'] ?? '');
    $city = trim($input['city'] ?? '');
    $monthlyBill = (int)($input['monthlyBill'] ?? ($input['monthly_bill'] ?? 0));
    $category = trim($input['category'] ?? 'Residential');
    $roofType = trim($input['roofType'] ?? ($input['roof_type'] ?? 'Concrete / RCC Flat'));
    $capacityKW = (float)($input['capacityKW'] ?? ($input['capacity_kw'] ?? 1.0));
    $subsidy = (int)($input['subsidy'] ?? ($input['subsidy_amount'] ?? 0));

    if (empty($fullName) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Full name and phone are required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO quotes (full_name, phone, city, monthly_bill, category, roof_type, capacity_kw, subsidy_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$fullName, $phone, $city, $monthlyBill, $category, $roofType, $capacityKW, $subsidy]);
        $id = $pdo->lastInsertId();

        // Also save as lead
        $parts = preg_split('/\s+/', $fullName);
        $initials = strtoupper(mb_substr($parts[0] ?? '', 0, 1) . mb_substr($parts[1] ?? '', 0, 1));
        $interest = "{$capacityKW} kW {$category} Solar";
        $leadStmt = $pdo->prepare("INSERT INTO leads (name, initials, source, city, interest, status, phone) VALUES (?, ?, 'Solar Quote Form', ?, ?, 'New', ?)");
        $leadStmt->execute([$fullName, $initials, $city, $interest, $phone]);

        echo json_encode(['success' => true, 'data' => ['id' => $id]]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
