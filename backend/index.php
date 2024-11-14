<?php
// backend/index.php
session_start();
header('Content-Type: application/json');

$action = $_GET['action'] ?? null;

if ($action === 'sendMessage') {
    // Hier würden Sie die Logik zum Speichern der Nachricht implementieren
    // Zum Beispiel in einer Datenbank
    $user = $_POST['user'] ?? 'Anonymous';
    $message = $_POST['message'] ?? '';

    // Simulieren Sie die Speicherung der Nachricht
    $_SESSION['messages'][] = ['user' => $user, 'message' => $message];

    echo json_encode(['status' => 'success']);
    exit;
}

if ($action === 'getMessages') {
    // Geben Sie die gespeicherten Nachrichten zurück
    echo json_encode($_SESSION['messages'] ?? []);
    exit;
}