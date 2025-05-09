<?php require __DIR__ . '/includes/db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <title>Re:Loved</title>
</head>
<body>
    <div id="header">
        <a href="index.html"><h1 id="title">Re:Loved</h1></a>

        <div id="cart-icon-container">
            <i class="fas fa-shopping-cart" style="font-size: 24px;"></i>
            <span id="cart-count">0</span>
        </div>

        <div class="nav-elements">
            <nav>
                <span class="nav-item"><a href="about.html">About</a></span>
                <span class="nav-item"><a href="faq.html">FAQ</a></span>
                <span class="nav-item"><a href="reviews.html">Reviews</a></span>
                <span class="nav-item"><a href="Login.php">login</a></span>
            </nav>
        </div>
    </div>

    <div id="review-box" style="display: none;">
        <h3>Leave a Review</h3>
        <textarea id="review-text" placeholder="Write your review..."></textarea>
        <button id="submit-review">Submit Review</button>
    </div>
    <div class="product-grid">
        <?php
        $sql = "SELECT * FROM products";
        $stmt = pdo($pdo, $sql);

        // Fetch the results
        while ($row = $stmt->fetch()):
        ?>
        <div class="product-card" data-product-name="<?= htmlspecialchars($row['name']) ?>">
            <img style="width: 50%;" src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['name']) ?>">
            <h3><?= htmlspecialchars($row['name']) ?></h3>
            <div class="price">$<?= htmlspecialchars($row['price']) ?></div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
            <?php endwhile; ?>
    </div>

    <div class="information">
        <p style="text-align: left;">Steven Ciresi</p>
        <p style="text-align: left;">steven.ciresi@uri.edu</p>
        <p style="text-align: left;">XX Street, XX</p>
        <p style="text-align: left;">Established 2025</p>
    </div>


    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script type="module" src="js/scripts.js"></script>
</body>
</html>
