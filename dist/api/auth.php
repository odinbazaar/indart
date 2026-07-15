<?php
// Yonetim paneli girisi — sifreyi sunucu tarafinda dogrular
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    indart_json_out(['ok' => false, 'error' => 'POST gerekli'], 405);
}

$body = indart_read_json_body();
$password = ($body !== null && isset($body['password'])) ? $body['password'] : '';

if (!indart_check_password($password)) {
    usleep(400000); // kaba kuvvet denemelerini yavaslat
    indart_json_out(['ok' => false, 'error' => 'Hatali sifre'], 401);
}

indart_json_out(['ok' => true]);
