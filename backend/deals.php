<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM `deals` ORDER BY `id` DESC");
            $deals = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'data' => $deals]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['customer']) || empty($data['value'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Customer name and value are required']);
            exit();
        }

        $customer     = trim($data['customer']);
        $project_type = !empty($data['project_type']) ? trim($data['project_type']) : 'Rooftop 5 kW';
        $value        = (int)$data['value'];
        $stage        = !empty($data['stage']) ? trim($data['stage']) : 'qualified';
        $owner        = !empty($data['owner']) ? trim($data['owner']) : 'Rahul';

        try {
            $stmt = $pdo->prepare("
                INSERT INTO `deals` (`customer`, `project_type`, `value`, `stage`, `owner`)
                VALUES (:customer, :project_type, :value, :stage, :owner)
            ");
            $stmt->execute([
                ':customer'     => $customer,
                ':project_type' => $project_type,
                ':value'        => $value,
                ':stage'        => $stage,
                ':owner'        => $owner,
            ]);

            $newId = $pdo->lastInsertId();
            echo json_encode([
                'status'  => 'success',
                'message' => 'Deal created successfully',
                'data'    => [
                    'id'           => (string)$newId,
                    'customer'     => $customer,
                    'project_type' => $project_type,
                    'value'        => $value,
                    'stage'        => $stage,
                    'owner'        => $owner,
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['id']) || empty($data['stage'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Deal ID and stage are required']);
            exit();
        }

        $id    = (int)$data['id'];
        $stage = trim($data['stage']);

        try {
            $stmt = $pdo->prepare("UPDATE `deals` SET `stage` = :stage WHERE `id` = :id");
            $stmt->execute([':stage' => $stage, ':id' => $id]);

            echo json_encode(['status' => 'success', 'message' => 'Deal stage updated successfully']);
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
