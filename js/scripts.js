
var $title = $("#title");
var $productsLink = $("#products-link");
var $faqLink = $("#faq-link");


$title.css("color", "blue");


$faqLink.on("click", function (e) {
    e.preventDefault(); // ignore navigation
    alert("This page is under construction!");
});

