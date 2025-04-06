<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothing Store</title>
</head>
<body>

    <?php include 'index.php'; ?>

    <h1>Clothing Store</h1>

    <h2><?php echo $cloth->shirt; ?></h2>
    <p>Price: $<?php echo $cloth->price; ?></p>
    <p>Size: <?php echo $cloth->size; ?></p>
    <p>Stock: <?php echo $cloth->getStock(); ?></p>

    <form method="POST">
        <!-- hidden field to persist stock -->
        <input type="hidden" name="stock" value="<?php echo $stock; ?>">
        <button type="submit">Buy Now</button>
    </form>

    <?php if (!empty($message)) { ?>
        <p><strong><?php echo $message; ?></strong></p>
    <?php } ?>

</body>
</html>
