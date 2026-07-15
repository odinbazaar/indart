<?php
// Yonetim panelinden gelen site verisini kalici olarak diske yazar
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    indart_json_out(['ok' => false, 'error' => 'POST gerekli'], 405);
}

$body = indart_read_json_body();
if ($body === null) {
    indart_json_out(['ok' => false, 'error' => 'Gecersiz istek govdesi (veri cok buyuk olabilir)'], 400);
}

$password = isset($body['password']) ? $body['password'] : '';
if (!indart_check_password($password)) {
    usleep(400000);
    indart_json_out(['ok' => false, 'error' => 'Yetkisiz — sifre hatali'], 401);
}

if (!isset($body['data']) || !is_array($body['data'])) {
    indart_json_out(['ok' => false, 'error' => 'Kaydedilecek veri yok'], 400);
}

$json = json_encode($body['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
if ($json === false) {
    indart_json_out(['ok' => false, 'error' => 'JSON kodlanamadi'], 500);
}

$file = indart_data_file();
$dir  = dirname($file);

if (!is_dir($dir) || !is_writable($dir)) {
    indart_json_out(['ok' => false, 'error' => 'Yazilabilir klasor bulunamadi: ' . $dir], 500);
}

// Onceki surumun yedegi (tek kademe)
if (is_file($file)) {
    @copy($file, $file . '.bak');
}

// Atomik yazim: once gecici dosya, sonra yer degistir
$tmp = $file . '.tmp';
if (@file_put_contents($tmp, $json, LOCK_EX) === false) {
    indart_json_out(['ok' => false, 'error' => 'Gecici dosya yazilamadi'], 500);
}
if (!@rename($tmp, $file)) {
    @unlink($tmp);
    indart_json_out(['ok' => false, 'error' => 'Dosya guncellenemedi'], 500);
}

indart_json_out(['ok' => true, 'savedAt' => date('c'), 'bytes' => strlen($json)]);
