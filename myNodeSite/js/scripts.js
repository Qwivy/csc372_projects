var $title = $("#title");
var $productsLink = $("#products-link");
var $faqLink = $("#faq-link");


$(document).ready(function () {
    // Initially hide the entire header
    $("#header").css("opacity", "0");

    // When hovered, fade in the header
    $("#header").hover(
        function () {
            $(this).stop().fadeTo(300, 1); // Fade in
        },
        function () {
            $(this).stop().fadeTo(300, 0); // Fade out
        }
    );
});

$(document).ready(function () {
    let cartCount = 0;

    // Function to update the cart count display
    function updateCartCount() {
        $("#cart-count").text(cartCount);
    }

    function loadHTML(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true); 

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText); // Update page with response HTML
            }
        };

        xhr.send(); // Send the request
    }

    $(document).on("click", ".add-to-cart", function () {
        let addToCartButton = $(this);
        
        // If the button says "Add to Cart", add the item to the cart
        if (addToCartButton.text() === "Add to Cart") {
            cartCount += 1; // Increase cart count by 1
            addToCartButton.text("Remove from Cart"); // Change the button text to "Remove from Cart"

            // Load "Added to Cart" message from added.html
            loadHTML("added.html", function (response) {
                $("#cart-message").html(response); // Update a designated div with response
            });
        } 
        // If the button says "Remove from Cart", remove the item from the cart
        else if (addToCartButton.text() === "Remove from Cart") {
            cartCount -= 1; // Decrease cart count by 1
            addToCartButton.text("Add to Cart"); // Revert button text back to "Add to Cart"

            // Load "Removed from Cart" message from removed.html (if applicable)
            loadHTML("removed.html", function (response) {
                $("#cart-message").html(response);
            });
        }

        // Update the cart count after each action
        updateCartCount();
    });
});


$(document).ready(function () {
    $("#load-initiatives").on("click", function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/sustainability.xml", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let xmlDoc = xhr.responseXML;
                let initiatives = xmlDoc.getElementsByTagName("initiative");
                let output = "<ul>";

                for (let i = 0; i < initiatives.length; i++) {
                    let title = initiatives[i].getElementsByTagName("title")[0].textContent;
                    let description = initiatives[i].getElementsByTagName("description")[0].textContent;
                    output += `<li><strong>${title}</strong>: ${description}</li>`;
                }

                output += "</ul>";
                $("#initiatives-container").html(output);
            }
        };
        xhr.send();
    });
});

$(document).ready(function () {
    $("#load-faq").on("click", function () {
        $.ajax({
            url: "/faq.json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log("Loaded FAQ data:", data); // Log the data
        
                let output = "<ul>";
                data.faqs.forEach(function (faq) {
                    output += `
                        <li>
                            <strong>${faq.question}</strong>
                            <p>${faq.answer}</p>
                        </li>`;
                });
                output += "</ul>";
        
                $("#faq-container").html(output); // Display the FAQ list
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error loading FAQ JSON:", textStatus, errorThrown);
                alert("Error loading FAQs. Please try again later.");
            }
        });
    });
});


// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR7uCYI8RWrpMwUjxLzpOa89Z8fd7Y61w",
  authDomain: "reloved-368a1.firebaseapp.com",
  projectId: "reloved-368a1",
  storageBucket: "reloved-368a1.firebasestorage.app",
  messagingSenderId: "826347886822",
  appId: "1:826347886822:web:98f961d68fb61a8c300327",
  measurementId: "G-EZ3L05VP85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cart and review tracking
let cartCount = 0;
let currentProduct = "";

// Show review box when "Add to Cart" is clicked
$(document).on("click", ".add-to-cart", function () {
    currentProduct = $(this).closest(".product-card").data("product-name"); // Capture the product name
    if (!currentProduct) {
        console.error("No product name found!");
        return;
    }

    // Increase cart count
    cartCount += 1;  
    $("#cart-count").text(cartCount);  // Update cart count display
    
    // Show the review box when an item is added to the cart
    $("#review-box").show();

    // Optionally, update the product name display in the review box
    $("#review-box .product-name").text(`Review for: ${currentProduct}`);
});

// Submit review and save to Firebase
$("#submit-review").on("click", async function () {
    const reviewText = $("#review-text").val().trim();
    
    if (reviewText === "") {
        alert("Please enter a review.");
        return;
    }

    try {
        await addDoc(collection(db, "reviews"), {
            product: currentProduct,
            text: reviewText,
            timestamp: new Date(),
        });

        alert("Review submitted!");
        $("#review-text").val(""); // Clear review input
        $("#review-box").hide();   // Hide the review box after submission
    } catch (error) {
        console.error("Error adding review: ", error);
    }
});

// Load reviews from Firebase and display them
async function loadReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviewsList = $("#reviews-list");
    reviewsList.empty(); // Clear existing reviews

    querySnapshot.forEach((doc) => {
        const review = doc.data();
        reviewsList.append(`
            <li>
                <strong>Product: ${review.product}</strong><br>
                Review: ${review.text}<br>
                Date: ${new Date(review.timestamp.seconds * 1000).toLocaleString()}
            </li>
        `);
    });
}

$(document).ready(function () {
    loadReviews();
});
