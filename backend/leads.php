<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM `leads` ORDER BY `id` DESC");
            $leads = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'data' => $leads]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Lead name is required']);
            exit();
        }

        $name     = trim($data['name']);
        $initials = !empty($data['initials']) ? trim($data['initials']) : strtoupper(substr($name, 0, 2));
        $source   = !empty($data['source']) ? trim($data['source']) : 'Website form';
        $city     = !empty($data['city']) ? trim($data['city']) : '';
        $interest = !empty($data['interest']) ? trim($data['interest']) : '';
        $status   = !empty($data['status']) ? trim($data['status']) : 'New';
        $assigned = !empty($data['assigned']) ? trim($data['assigned']) : 'Unassigned';
        $phone    = !empty($data['phone']) ? trim($data['phone']) : '';

        try {
            $stmt = $pdo->prepare("
                INSERT INTO `leads` (`name`, `initials`, `source`, `city`, `interest`, `status`, `assigned`, `phone`)
                VALUES (:name, :initials, :source, :city, :interest, :status, :assigned, :phone)
            ");
            $stmt->execute([
                ':name'     => $name,
                ':initials' => $initials,
                ':source'   => $source,
                ':city'     => $city,
                ':interest' => $interest,
                ':status'   => $status,
                ':assigned' => $assigned,
                ':phone'    => $phone,
            ]);

            $newId = $pdo->lastInsertId();
            echo json_encode([
                'status'  => 'success',
                'message' => 'Lead created successfully',
                'data'    => [
                    'id'       => (string)$newId,
                    'name'     => $name,
                    'initials' => $initials,
                    'source'   => $source,
                    'city'     => $city,
                    'interest' => $interest,
                    'status'   => $status,
                    'assigned' => $assigned,
                    'phone'    => $phone,
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Lead ID is required']);
            exit();
        }

        $id = (int)$data['id'];

        try {
            $stmt = $pdo->prepare("
                UPDATE `leads` 
                SET `status` = COALESCE(:status, `status`),
                    `assigned` = COALESCE(:assigned, `assigned`)
                WHERE `id` = :id
            ");
            $stmt->execute([
                ':status'   => $data['status'] ?? null,
                ':assigned' => $data['assigned'] ?? null,
                ':id'       => $id,
            ]);

            echo json_encode(['status' => 'success', 'message' => 'Lead updated successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($_GET['id']) ? (int)$_GET['id'] : (isset($data['id']) ? (int)$data['id'] : 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Valid Lead ID is required']);
            exit();
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['status' => 'success', 'message' => 'Lead deleted successfully']);
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
