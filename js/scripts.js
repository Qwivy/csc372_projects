import React, { useState } from "react";
import ReactDOM from "react-dom";
import "css/style.css"; 


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




import React, { useState } from "react";
import ReactDOM from "react-dom";
import "css/style.css"; 

const PopOutImage = ({ src, alt }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <img 
            src={src} 
            alt={alt} 
            className={`pop-image ${isZoomed ? "zoomed" : ""}`} 
            onClick={() => setIsZoomed(!isZoomed)} 
            style={{
                transition: "transform 0.3s ease",
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
                cursor: "pointer"
            }}
        />
    );
};

const App = () => {
    return (
        <div>
            <h1 id="title" style={{ color: "blue" }}>Re:Loved</h1>

            <div className="nav-elements">
                <nav>
                    <span className="nav-item">
                        <a href="about.html">About</a>
                    </span>
                    <span className="nav-item">
                        <a href="faq.html">FAQ</a>
                    </span>
                </nav>
            </div>

            <div className="product-grid">
                <div className="product-card">
                    <PopOutImage src="images/placeholder.png" alt="Shirt" />
                    <h3>Classic Shirt</h3>
                    <div className="price">$20.99</div>
                    <button className="add-to-cart">Add to Cart</button>
                </div>

                <div className="product-card">
                    <PopOutImage src="images/placeholder.png" alt="Jeans" />
                    <h3>Denim Jeans</h3>
                    <div className="price">$20.99</div>
                    <button className="add-to-cart">Add to Cart</button>
                </div>

                <div className="product-card">
                    <PopOutImage src="images/placeholder.png" alt="Jacket" />
                    <h3>Leather Jacket</h3>
                    <div className="price">$20.99</div>
                    <button className="add-to-cart">Add to Cart</button>
                </div>

                <div className="product-card">
                    <PopOutImage src="images/placeholder.png" alt="Hat" />
                    <h3>Baseball Hat</h3>
                    <div className="price">$20.99</div>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

// Render the App component to the root element
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
