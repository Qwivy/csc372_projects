<?php
// Get form data from POST
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Simple validation
if ($username === 'admin' && $password === 'password') {
    // Redirect to index.php with a session or URL param
    session_start();
    $_SESSION['username'] = $username;
    header('Location: index.php');
    exit();
} else {
    echo "<h2>Invalid login. Please try again.</h2>";
    echo "<a href='login.html'>Back to Login</a>";
}
?>
