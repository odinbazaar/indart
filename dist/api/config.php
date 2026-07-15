<?php
// INDART yonetim paneli — sunucu tarafi ortak ayarlar
// NOT: Sifre burada duz metin olarak TUTULMAZ. Sadece salt + SHA-256 ozeti saklanir.

const INDART_SALT      = 'b501d37e104ab02c2adaab09f2f04786';
const INDART_PASS_HASH = '35a50470a1379fc8ef495ea3b71f9484caeaf103ecfd693f0e40d008c1a17a95';

/**
 * Verinin saklanacagi dosya yolu.
 * Her deploy public_html'i yeniden olusturdugu icin veri web kokunun DISINDA tutulur;
 * boylece hem redeploy'da silinmez hem de tarayiciyla dogrudan indirilemez.
 */
function indart_data_file() {
    $root = isset($_SERVER['DOCUMENT_ROOT']) && $_SERVER['DOCUMENT_ROOT'] !== ''
        ? rtrim(str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']), '/')
        : dirname(dirname(__DIR__));

    $dir = dirname($root) . '/indart-data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }

    // Web koku disina yazilamiyorsa son care: api/_data (deploy'da silinebilir)
    if (!is_dir($dir) || !is_writable($dir)) {
        $dir = __DIR__ . '/_data';
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
    }

    return $dir . '/site-data.json';
}

function indart_check_password($password) {
    if (!is_string($password) || $password === '') {
        return false;
    }
    return hash_equals(INDART_PASS_HASH, hash('sha256', INDART_SALT . $password));
}

function indart_read_json_body() {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return null;
    }
    $body = json_decode($raw, true);
    return is_array($body) ? $body : null;
}

function indart_json_out($payload, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
