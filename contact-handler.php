<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/**
 * Send a JSON response and terminate the request.
 *
 * @param bool   $success
 * @param string $message
 * @param int    $statusCode
 */
function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode(
        [
            'success' => $success,
            'message' => $message,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

/**
 * Create a multipart boundary string with a safe fallback.
 */
function makeBoundary(): string
{
    try {
        return 'MORF-' . bin2hex(random_bytes(16));
    } catch (Throwable $exception) {
        return 'MORF-' . md5((string) microtime(true));
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Only POST requests are allowed.', 405);
}

$name        = trim((string)($_POST['name'] ?? ''));
$email       = trim((string)($_POST['email'] ?? ''));
$interested  = trim((string)($_POST['Interested'] ?? ''));
$description = trim((string)($_POST['project-description'] ?? ''));
$coverLetter = trim((string)($_POST['cover-letter'] ?? ''));
$phone       = trim((string)($_POST['phone'] ?? ''));
$pageTitle   = trim((string)($_POST['page_title'] ?? ''));
$pageUrl     = trim((string)($_POST['page_url'] ?? ''));

if ($name === '' || $email === '') {
    respond(false, 'Please provide both your name and a valid email address.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.', 422);
}

$messageLines = [
    "Name: {$name}",
    "Email: {$email}",
];

if ($phone !== '') {
    $messageLines[] = "Phone: {$phone}";
}

if ($interested !== '') {
    $messageLines[] = "Interested in: {$interested}";
}

if ($pageTitle !== '' || $pageUrl !== '') {
    $pageInfo = trim($pageTitle . ' ' . $pageUrl);
    $messageLines[] = 'Page: ' . $pageInfo;
}

if ($description !== '') {
    $messageLines[] = '';
    $messageLines[] = 'Project description:';
    $messageLines[] = $description;
}

if ($coverLetter !== '') {
    $messageLines[] = '';
    $messageLines[] = 'Cover letter:';
    $messageLines[] = $coverLetter;
}

if ($description === '' && $coverLetter === '') {
    $messageLines[] = '';
    $messageLines[] = 'No additional message was provided.';
}

$bodyText = implode("\r\n", $messageLines);

$attachment = null;
if (!empty($_FILES['file-upload-field']['name'])) {
    $file = $_FILES['file-upload-field'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        respond(false, 'We could not process the attached file. Please try again.', 400);
    }

    $maxFileSize = 10 * 1024 * 1024; // 10 MB
    if ($file['size'] > $maxFileSize) {
        respond(false, 'The attached file is too large. Please keep it under 10MB.', 413);
    }

    $fileContents = file_get_contents($file['tmp_name']);
    if ($fileContents === false) {
        respond(false, 'We could not read the attached file. Please try again.', 500);
    }

    $sanitisedName = preg_replace('/[^A-Za-z0-9._-]/', '_', $file['name']);
    $attachment    = [
        'name'    => $sanitisedName ?: 'attachment',
        'type'    => $file['type'] ?: 'application/octet-stream',
        'content' => chunk_split(base64_encode($fileContents)),
    ];
}

$recipient = 'hey@morf.digital';
$subject   = 'New enquiry from the MORF website';
if ($interested !== '') {
    $subject .= " ({$interested})";
}

$headers   = [];
$headers[] = 'From: MORF Website <no-reply@morf.digital>';
$headers[] = 'Reply-To: ' . ($name !== '' ? "{$name} <{$email}>" : $email);
$headers[] = 'MIME-Version: 1.0';

if ($attachment !== null) {
    $boundary = makeBoundary();
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $bodyText . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= 'Content-Type: ' . $attachment['type'] . '; name="' . $attachment['name'] . '"' . "\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"' . "\r\n\r\n";
    $body .= $attachment['content'] . "\r\n";
    $body .= "--{$boundary}--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $body      = $bodyText;
}

$headersString = implode("\r\n", $headers);

if (!mail($recipient, $subject, $body, $headersString)) {
    respond(false, 'We could not send your message. Please try again later.', 500);
}

respond(true, 'Thank you! Your message has been sent successfully.');
