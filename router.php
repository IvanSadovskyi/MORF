<?php
// router.php
// Minimal router for PHP built-in server to emulate common .htaccess rewrites.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$uri = rawurldecode($uri); // keep UTF-8 paths
$root = __DIR__;

// 1) Serve existing static files directly (css/js/img/any file)
$real = realpath($root . $uri);
if ($real !== false && str_starts_with($real, $root) && is_file($real)) {
    return false; // let the built-in server handle it
}

// 2) Try "clean URL" -> "/path.php"
$tryPhp = $root . $uri . '.php';
if (is_file($tryPhp)) {
    spoofServerVars($uri . '.php', $tryPhp);
    require $tryPhp;
    exit;
}

// 3) Try directory indexes -> "/dir/index.php"
if (is_dir($root . $uri)) {
    $tryDirIndex = rtrim($root . $uri, '/\\') . '/index.php';
    if (is_file($tryDirIndex)) {
        spoofServerVars(rtrim($uri, '/\\') . '/index.php', $tryDirIndex);
        require $tryDirIndex;
        exit;
    }
}

// 4) Fallback to front controller (index.php)
$front = $root . '/index.php';
spoofServerVars('/index.php', $front);
require $front;

// ---- helpers ----
function spoofServerVars(string $scriptName, string $scriptFilename): void {
    // Adjust superglobals so app logic sees the resolved script
    $_SERVER['SCRIPT_NAME']     = $scriptName;
    $_SERVER['SCRIPT_FILENAME'] = $scriptFilename;
    $_SERVER['PHP_SELF']        = $scriptName;
}
