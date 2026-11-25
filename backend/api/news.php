<?php
require_once __DIR__ . '/db.php';

// Automatically create table if it doesn't exist
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `news_updates` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `brief` TEXT NOT NULL,
            `image_url` VARCHAR(500) DEFAULT NULL,
            `category` VARCHAR(100) DEFAULT 'Solar News',
            `link` VARCHAR(255) DEFAULT '',
            `is_active` TINYINT(1) DEFAULT 1,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Check if table is empty, seed defaults
    $chk = $pdo->query("SELECT COUNT(*) FROM `news_updates`")->fetchColumn();
    if ($chk == 0) {
        $seedStmt = $pdo->prepare("
            INSERT INTO `news_updates` (`title`, `brief`, `image_url`, `category`, `link`, `is_active`) VALUES
            (?, ?, ?, ?, ?, 1),
            (?, ?, ?, ?, ?, 1),
            (?, ?, ?, ?, ?, 1),
            (?, ?, ?, ?, ?, 1)
        ");
        $seedStmt->execute([
            'PM Surya Ghar Yojana 2026: Get ₹78,000 Direct Subsidy in Rajasthan',
            'Under PM Surya Ghar Muft Bijli Yojana, homeowners can get up to ₹78,000 central financial assistance directly into their bank accounts. SB Solar handles the end-to-end DISCOM approval & net-metering process.',
            'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
            'Govt Subsidy',
            '/emi-solar-plan',

            'Next-Gen Bi-facial & TOPCon Solar Panels: Up to 30% Extra Power',
            'SB Solar now installs Tier-1 dual-glass bifacial panels in Rajasthan that capture reflected sunlight from the roof surface, providing superior power generation even during hot peak summers.',
            'https://images.unsplash.com/photo-1508873696983-2df570464756?w=800&auto=format&fit=crop&q=80',
            'Technology',
            '/products',

            'Milestone: SB Solar Crosses 500+ Rooftop Installations in South Rajasthan',
            'We are proud to announce the milestone of over 500 residential, commercial, and agricultural installations across Dungarpur, Banswara, Udaipur, and surrounding districts with 99.8% customer satisfaction.',
            'https://images.unsplash.com/photo-1545209179-a5dc550496ac?w=800&auto=format&fit=crop&q=80',
            'Milestone',
            '/about',

            'Zero Down Payment Solar Loans at 6.5% - Offset 100% of Your Electricity Bill',
            'With partnerships across nationalized banks, residential rooftop solar is now 100% collateral-free. The money saved on your electricity bill covers your EMI from the very first month.',
            'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop&q=80',
            'Finance & EMI',
            '/emi-solar-plan'
        ]);
    }
} catch (Exception $e) {
    // Continue even if table creation has minor warning
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper to extract ID from URL path (e.g., /api/news/5 or /api/news.php?id=5)
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($requestUri, PHP_URL_PATH);
$path = trim(str_replace('/api', '', $path), '/');
$segments = explode('/', $path);

$urlId = null;
if (isset($segments[1]) && !empty($segments[1]) && !in_array($segments[1], ['news.php', 'blogs.php'])) {
    $urlId = $segments[1];
}

// ---------------- GET ----------------
if ($method === 'GET') {
    $id = $_GET['id'] ?? $urlId;
    $all = isset($_GET['all']) && ($_GET['all'] == '1' || $_GET['all'] === 'true');

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM `news_updates` WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row) {
            echo json_encode(['success' => true, 'data' => $row]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Post not found']);
        }
        exit();
    }

    $query = "SELECT * FROM `news_updates`";
    $params = [];

    if (!$all) {
        $query .= " WHERE is_active = 1";
    }

    $query .= " ORDER BY created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $items = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'count' => count($items),
            'data' => $items
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

// ---------------- POST ----------------
if ($method === 'POST') {
    $input = getJsonInput();
    $title = trim($input['title'] ?? '');
    $brief = trim($input['brief'] ?? '');
    $image_url = trim($input['image_url'] ?? '');
    $category = trim($input['category'] ?? 'Solar News');
    $link = trim($input['link'] ?? '');
    $is_active = isset($input['is_active']) ? (int)(bool)$input['is_active'] : 1;

    if (empty($title) || empty($brief)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Title and brief details are required']);
        exit();
    }

    // Default placeholder image if none supplied
    if (empty($image_url)) {
        $image_url = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80';
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `news_updates` (`title`, `brief`, `image_url`, `category`, `link`, `is_active`) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$title, $brief, $image_url, $category, $link, $is_active]);
        $newId = $pdo->lastInsertId();

        $fetchStmt = $pdo->prepare("SELECT * FROM `news_updates` WHERE id = ?");
        $fetchStmt->execute([$newId]);
        $row = $fetchStmt->fetch();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Update published successfully',
            'data' => $row
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

// ---------------- PUT ----------------
if ($method === 'PUT') {
    $input = getJsonInput();
    $id = $_GET['id'] ?? ($input['id'] ?? $urlId);

    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Post ID is required']);
        exit();
    }

    $fields = [];
    $params = [];

    if (isset($input['title'])) {
        $fields[] = "`title` = ?";
        $params[] = trim($input['title']);
    }
    if (isset($input['brief'])) {
        $fields[] = "`brief` = ?";
        $params[] = trim($input['brief']);
    }
    if (isset($input['image_url'])) {
        $fields[] = "`image_url` = ?";
        $params[] = trim($input['image_url']);
    }
    if (isset($input['category'])) {
        $fields[] = "`category` = ?";
        $params[] = trim($input['category']);
    }
    if (isset($input['link'])) {
        $fields[] = "`link` = ?";
        $params[] = trim($input['link']);
    }
    if (isset($input['is_active'])) {
        $fields[] = "`is_active` = ?";
        $params[] = (int)(bool)$input['is_active'];
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No fields provided to update']);
        exit();
    }

    $sql = "UPDATE `news_updates` SET " . implode(', ', $fields) . " WHERE id = ?";
    $params[] = $id;

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $fetchStmt = $pdo->prepare("SELECT * FROM `news_updates` WHERE id = ?");
        $fetchStmt->execute([$id]);
        $row = $fetchStmt->fetch();

        echo json_encode([
            'success' => true,
            'message' => 'Post updated successfully',
            'data' => $row
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

// ---------------- DELETE ----------------
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? $urlId;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Post ID is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM `news_updates` WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            'success' => true,
            'message' => 'Post deleted successfully'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
