<?php
class Cloth {
    public $shirt;
    public $price;
    public $size;
    private $stock;
    function __construct($shirt, $price, $size, $stock = 0) {
        $this->shirt = $shirt;
        $this->price = $price;
        $this->size = $size;
        $this->stock = $stock;
    }

    public function isAvailable() {
        return $this->stock > 0;
    }

    public function buy() {
        if ($this->isAvailable()) {
            $this->stock--;
            return "Purchase successful! Remaining stock: " . $this->stock;
        } else {
            return "Out of stock!";
        }
    }
    public function getStock() {
      return $this->stock;
  }
}

// get stock from form
$stock = isset($_POST['stock']) ? (int)$_POST['stock'] : 5;

// create Cloth object
$cloth = new Cloth("T-Shirt", 20, "M", $stock);

$message = "";

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $message = $cloth->buy();
    $stock = $cloth->getStock(); // update stock after purchase
}
?>