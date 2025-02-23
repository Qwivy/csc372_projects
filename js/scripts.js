 


var title = document.getElementById("title");
title.style.color = "blue"; // Change the text color to blue

const productsLink = document.getElementById("products-link");
const faqLink = document.getElementById("faq-link");



productsLink.addEventListener("click", function (e) {
    console.log("Products link clicked!");
    e.preventDefault(); // ignore navigation
    alert("This page is under construction!"); 
});

faqLink.addEventListener("click", function (e) {
    e.preventDefault(); // ignore navigation
    alert("This page is under construction!"); 
});
