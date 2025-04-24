<?php
require 'includes/db.php'; // Ensure the correct path to db.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? '';
    $image = $_POST['image'] ?? 'images/placeholder.png';

    // Use PDO for the insert query
    $sql = "INSERT INTO products (name, price, image) VALUES (:name, :price, :image)";
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':price', $price, PDO::PARAM_STR);  // Using PDO::PARAM_STR for price since it's a decimal
    $stmt->bindParam(':image', $image, PDO::PARAM_STR);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        $message = "Product added successfully!";
    } else {
        $message = "Error: " . $stmt->errorInfo()[2]; // Get the error message from PDO
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>
</head>
<body>
    <h2>Add New Product</h2>
    <?php if (!empty($message)): ?>
        <p style="color: green;"><?= $message ?></p>
    <?php endif; ?>
    <form method="POST" action="admin_panel.php">
        <input type="text" name="name" placeholder="Product Name" required><br>
        <input type="number" name="price" step="0.01" placeholder="Price" required><br>
        <input type="text" name="image" placeholder="Image URL (optional)"><br>
        <button type="submit">Add Product</button>
    </form>
</body>
</html>
