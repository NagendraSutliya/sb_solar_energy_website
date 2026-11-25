<?php
// Unified API router for SB Solar Energy
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($requestUri, PHP_URL_PATH);
$path = trim(str_replace('/api', '', $path), '/');

$segments = explode('/', $path);
$route = strtolower($segments[0] ?? '');

switch ($route) {
    case 'deals':
    case 'deals.php':
        require __DIR__ . '/deals.php';
        break;
    case 'leads':
    case 'leads.php':
        require __DIR__ . '/leads.php';
        break;
    case 'contacts':
    case 'contacts.php':
        require __DIR__ . '/contacts.php';
        break;
    case 'tasks':
    case 'tasks.php':
        require __DIR__ . '/tasks.php';
        break;
    case 'vendors':
    case 'vendors.php':
        require __DIR__ . '/vendors.php';
        break;
    case 'quotes':
    case 'quotes.php':
        require __DIR__ . '/quotes.php';
        break;
    case 'users':
    case 'users.php':
        require __DIR__ . '/users.php';
        break;
    case 'complaints':
    case 'complaints.php':
        require __DIR__ . '/complaints.php';
        break;
    case 'news':
    case 'news.php':
    case 'blogs':
    case 'blogs.php':
    case 'posts':
    case 'posts.php':
        require __DIR__ . '/news.php';
        break;
    case 'auth':
    case 'auth.php':
        require __DIR__ . '/auth.php';
        break;
    case 'health':
    case 'health.php':
    case '':
        require __DIR__ . '/health.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => "Endpoint '/api/{$route}' not found"]);
        break;
}
