<?php
function isValidText($text, $min = 1, $max = 100) {
    $length = strlen(trim($text));
    return ($length >= $min && $length <= $max);
}

function isValidNumber($number, $min = 0.01, $max = 10000.00) {
    return (is_numeric($number) && $number >= $min && $number <= $max);
}

function isValidImageType($imageType) {
    $validTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    return in_array(strtolower($imageType), $validTypes);
}
?>
