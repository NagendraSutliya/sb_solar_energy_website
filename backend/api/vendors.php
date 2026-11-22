<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

if ($method === 'GET') {
    $district = $_GET['district'] ?? null;
    $status = $_GET['status'] ?? null;
    $type = $_GET['type'] ?? null;

    $query = "SELECT * FROM vendors WHERE 1=1";
    $params = [];

    if ($district) { $query .= " AND district = ?"; $params[] = $district; }
    if ($status && $status !== 'all') { $query .= " AND status = ?"; $params[] = $status; }
    if ($type && $type !== 'all') { $query .= " AND business_type = ?"; $params[] = $type; }

    $query .= " ORDER BY is_official_hub DESC, rating DESC, created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $mapped = array_map(function($r) {
            $parsedTags = [];
            if (!empty($r['tags'])) {
                $decoded = json_decode($r['tags'], true);
                $parsedTags = is_array($decoded) ? $decoded : array_map('trim', explode(',', $r['tags']));
            }

            return [
                'id' => $r['vendor_code'] ?: ('v-' . $r['id']),
                'dbId' => (int)$r['id'],
                'name' => $r['name'],
                'contactPerson' => $r['contact_person'] ?: '',
                'email' => $r['email'] ?: '',
                'contact' => $r['contact'] ?: '',
                'address' => $r['address'] ?: '',
                'state' => $r['state'] ?: 'Rajasthan',
                'district' => $r['district'] ?: '',
                'businessType' => $r['business_type'] ?: 'dealer',
                'rating' => (float)$r['rating'] ?: 4.8,
                'reviewCount' => (int)$r['review_count'] ?: 0,
                'status' => $r['status'] ?: 'Pending',
                'tags' => $parsedTags,
                'registeredAt' => $r['created_at'],
                'isOfficialHub' => (bool)$r['is_official_hub'],
            ];
        }, $rows);

        echo json_encode(['success' => true, 'data' => $mapped]);
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
        echo json_encode(['success' => false, 'message' => 'Vendor id is required']);
        exit();
    }

    $status = $input['status'] ?? null;
    if (!$status) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Status is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("UPDATE vendors SET status = ? WHERE id = ? OR vendor_code = ?");
        $stmt->execute([$status, $id, $id]);
        echo json_encode(['success' => true, 'message' => 'Vendor status updated']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
