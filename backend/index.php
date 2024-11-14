<?php
session_start();
header('Content-Type: application/json');

// Initialize session variables if not set
if (!isset($_SESSION['messages'])) {
    $_SESSION['messages'] = [];
}
if (!isset($_SESSION['bannedUsers'])) {
    $_SESSION['bannedUsers'] = [];
}
if (!isset($_SESSION['admin'])) {
    $_SESSION['admin'] = null;
}

$action = $_GET['action'] ?? null;

// Handle different actions
switch ($action) {
    case 'sendMessage':
        sendMessage();
        break;
    case 'getMessages':
        getMessages();
        break;
    case 'banUser':
        banUser();
        break;
    case 'login':
        login();
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}

/**
 * Handle sending a message
 */
function sendMessage() {
    $user = $_POST['user'] ?? 'Anonymous';
    $message = $_POST['message'] ?? '';

    // Simulate storing the message
    $_SESSION['messages'][] = ['user' => $user, 'message' => $message];

    echo json_encode(['status' => 'success']);
    exit;
}

/**
 * Handle retrieving messages
 */
function getMessages() {
    echo json_encode($_SESSION['messages']);
    exit;
}

/**
 * Handle banning a user
 */
function banUser() {
    $username = $_POST['username'] ?? '';

    // Only admin can ban users
    if ($_SESSION['admin'] === $_POST['admin']) {
        $_SESSION['bannedUsers'][] = $username;
        echo json_encode(['status' => 'success', 'message' => 'User banned']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Only admin can ban users']);
    }
    exit;
}

/**
 * Handle user login
 */
function login() {
    $username = $_POST['username'] ?? '';

    // Check if user is banned
    if (in_array($username, $_SESSION['bannedUsers'])) {
        echo json_encode(['status' => 'error', 'message' => 'User is banned']);
        exit;
    }

    // Set the first user as admin
    if ($_SESSION['admin'] === null) {
        $_SESSION['admin'] = $username;
        echo json_encode(['status' => 'success', 'message' => 'Logged in as admin']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Logged in as user']);
    }
    exit;
}