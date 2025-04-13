<?php
session_start();

// redirect if not logged in
if (!isset($_SESSION['username'])) {
    header('Location: ../login.html');
    exit();
}

// include validation functions
require_once 'validation.php';

$nickname = '';

// Handle nickname form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['nickname_submit'])) {
    $nicknameInput = trim($_POST['nickname'] ?? '');
    if (isValidText($nicknameInput, 3, 20)) {
        setcookie("nickname", $nicknameInput);
        $nickname = $nicknameInput;
    } else {
    }
} elseif (isset($_COOKIE['nickname'])) {
    $nickname = htmlspecialchars($_COOKIE['nickname']);
}

// === Logout logic ===
if (isset($_GET['logout'])) {
    session_unset();
    session_destroy();
    setcookie("nickname", ""); // expire nickname cookie
    header("Location: ../login.html");
    exit();
}


$formData = [
    'name' => '',
    'price' => '',
    'image' => ''
];

$formErrors = [
    'name' => '',
    'price' => '',
    'image' => ''
];

$formMessage = '';
$hasSubmitted = $_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['nickname_submit']);

if ($hasSubmitted) {
    $formData['name'] = $_POST['name'] ?? '';
    $formData['price'] = $_POST['price'] ?? '';
    $formData['image'] = $_POST['image'] ?? '';

    // validation
    if (!isValidText($formData['name'], 3, 50)) {
        $formErrors['name'] = 'Product name must be between 3 and 50 characters.';
    }

    if (!isValidNumber($formData['price'], 0.01, 9999.99)) {
        $formErrors['price'] = 'Price must be a number between $0.01 and $9999.99.';
    }

    $imageExtension = pathinfo($formData['image'], PATHINFO_EXTENSION);
    if (!isValidImageType($imageExtension)) {
        $formErrors['image'] = 'Image must be a valid format (jpg, png, gif, etc).';
    }

    $allErrors = implode('', $formErrors);

    $formMessage = empty($allErrors)
        ? "Product data is valid!"
        : "Please correct the form errors.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Builder</title>
    <style>
        .error { color: red; }
        .product-card {
            border: 1px solid #ccc;
            padding: 16px;
            margin: 16px;
            width: 200px;
            text-align: center;
        }
        .price {
            font-weight: bold;
            margin-top: 8px;
        }
    </style>
</head>
<body>

    <h1>Welcome, <?= htmlspecialchars($_SESSION['username']) ?>!</h1>

    <?php if ($nickname): ?>
        <p>Your nickname (from cookie): <strong><?= $nickname ?></strong></p>
    <?php endif; ?>

    <form method="POST">
        <label>Set Nickname:</label><br>
        <input type="text" name="nickname" value="<?= htmlspecialchars($nickname) ?>"><br>
        <input type="submit" name="nickname_submit" value="Save Nickname">
    </form>


    <p><a href="?logout=1">🚪 Log Out</a></p>

    <h2>Add Product</h2>
    <?php if ($formMessage): ?>
        <p><strong><?= $formMessage ?></strong></p>
    <?php endif; ?>

    <form method="POST" action="index.php">
        <label>Product Name:</label><br>
        <input type="text" name="name" value="<?= htmlspecialchars($formData['name']) ?>"><br>
        <span class="error"><?= $formErrors['name'] ?></span><br><br>

        <label>Price:</label><br>
        <input type="number" step="0.01" name="price" value="<?= htmlspecialchars($formData['price']) ?>"><br>
        <span class="error"><?= $formErrors['price'] ?></span><br><br>

        <label>Image URL:</label><br>
        <input type="text" name="image" value="<?= htmlspecialchars($formData['image']) ?>"><br>
        <span class="error"><?= $formErrors['image'] ?></span><br><br>

        <input type="submit" value="Add Product">
    </form>

    <?php if ($hasSubmitted && empty($allErrors)): ?>
        <h2>Preview</h2>
        <div class="product-card">
            <img style="width: 50%;" src="<?= htmlspecialchars($formData['image']) ?>" alt="<?= htmlspecialchars($formData['name']) ?>">
            <h3><?= htmlspecialchars($formData['name']) ?></h3>
            <div class="price">$<?= number_format((float)$formData['price'], 2) ?></div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    <?php endif; ?>

</body>
</html>
