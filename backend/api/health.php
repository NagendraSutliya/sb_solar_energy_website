<?php
require_once __DIR__ . '/db.php';

echo json_encode([
    'status' => 'ok',
    'service' => 'SB Solar Energy MySQL PHP API',
    'database' => 'Connected successfully',
    'timestamp' => date('c')
]);
