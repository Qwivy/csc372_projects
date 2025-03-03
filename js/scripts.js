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
        xhr.open("GET", "ajax.xml", true);
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
            url: "faq.json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                let output = "<ul>";
                data.faqs.forEach(function (faq) {
                    output += `
                        <li>
                            <strong>${faq.question}</strong>
                            <p>${faq.answer}</p>
                        </li>`;
                });
                output += "</ul>";

                $("#faq-container").html(output);
            },
            error: function () {
                alert("Error loading FAQs. Please try again later.");
            }
        });
    });
});
