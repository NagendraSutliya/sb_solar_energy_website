<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM `contacts` ORDER BY `id` DESC");
            $contacts = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'data' => $contacts]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Contact name is required']);
            exit();
        }

        $name     = trim($data['name']);
        $initials = !empty($data['initials']) ? trim($data['initials']) : strtoupper(substr($name, 0, 2));
        $city     = !empty($data['city']) ? trim($data['city']) : '';
        $phone    = !empty($data['phone']) ? trim($data['phone']) : '';
        $tag      = !empty($data['tag']) ? trim($data['tag']) : 'Lead';

        try {
            $stmt = $pdo->prepare("
                INSERT INTO `contacts` (`name`, `initials`, `city`, `phone`, `tag`)
                VALUES (:name, :initials, :city, :phone, :tag)
            ");
            $stmt->execute([
                ':name'     => $name,
                ':initials' => $initials,
                ':city'     => $city,
                ':phone'    => $phone,
                ':tag'      => $tag,
            ]);

            $newId = $pdo->lastInsertId();
            echo json_encode([
                'status'  => 'success',
                'message' => 'Contact created successfully',
                'data'    => [
                    'id'       => (string)$newId,
                    'name'     => $name,
                    'initials' => $initials,
                    'city'     => $city,
                    'phone'    => $phone,
                    'tag'      => $tag,
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}
