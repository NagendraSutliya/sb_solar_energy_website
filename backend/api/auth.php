<?php
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'login';
$input = getJsonInput();

if ($action === 'login') {
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';
    $role = $input['role'] ?? 'customer';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required.'
        ]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT id, name, email, password, role, phone, status FROM users WHERE LOWER(email) = ? AND status = 'active' LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || $user['password'] !== $password) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => "Invalid email or password for {$role} portal."
            ]);
            exit();
        }

        if ($role && $user['role'] !== $role && $user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => "Access denied. Your account is registered as '{$user['role']}' not '{$role}'."
            ]);
            exit();
        }

        unset($user['password']);

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => 'sb_session_' . $user['id'] . '_' . time(),
            'user' => $user
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
    exit();
}

if ($action === 'register') {
    $name = trim($input['name'] ?? '');
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';
    $phone = trim($input['phone'] ?? '');
    $role = ($input['role'] ?? 'customer') === 'admin' ? 'admin' : 'customer';

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Name, email, and password are required.'
        ]);
        exit();
    }

    try {
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1");
        $checkStmt->execute([$email]);
        if ($checkStmt->fetch()) {
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'message' => 'An account with this email already exists.'
            ]);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, phone, status) VALUES (?, ?, ?, ?, ?, 'active')");
        $stmt->execute([$name, $email, $password, $role, $phone]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Account registered successfully.',
            'data' => [
                'id' => $pdo->lastInsertId(),
                'name' => $name,
                'email' => $email,
                'role' => $role
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to register account: ' . $e->getMessage()
        ]);
    }
    exit();
}

http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Unknown auth action']);
