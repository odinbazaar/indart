<?php
// Kayitli site verisini dondurur. Herkese acik (site icerigi zaten herkese gorunur).
require __DIR__ . '/config.php';

$file = indart_data_file();

if (!is_file($file)) {
    // Henuz kayit yok — istemci koddaki varsayilanlari kullanir
    indart_json_out(['ok' => true, 'data' => null]);
}

$raw = @file_get_contents($file);
if ($raw === false) {
    indart_json_out(['ok' => false, 'error' => 'Veri okunamadi', 'data' => null], 500);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    indart_json_out(['ok' => false, 'error' => 'Veri bozuk', 'data' => null], 500);
}

indart_json_out(['ok' => true, 'data' => $data]);
