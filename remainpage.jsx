import React, { useState, useEffect } from "react";
import filter from "./filter.jpg";
import "./remainpage.css";

const RemainPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [productData, setProductData] = useState([]);

    // Fetch updated products from the backend
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:3003/products");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            setProductData(data); // ✅ Restore correctly grouped data
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to load products. Please try again later.");
        }
    };

    // Fetch products on component mount & refresh every 10s
    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div className="up">
                <h1>Buy the Old Products</h1>
            </div>
            <div className="search">
                <input type="search" placeholder="Search..." className="search-bar" />
                <button onClick={fetchProducts}>Refresh</button>
                <img
                    src={filter}
                    alt="filter"
                    className="logo"
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                    <select className="dropdown">
                        <option value="option1">Brand</option>
                        <option value="option2">Location</option>
                        <option value="option3">Latest</option>
                        <option value="option4">Oldest</option>
                    </select>
                )}
            </div>
            <div className="post">
                <h2>Product Inventory</h2>
                {productData.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    productData.reduce((acc, product) => {
                        // If username is already added, just push the product to existing user's array
                        let userEntry = acc.find((entry) => entry.username === product.username);
                        if (!userEntry) {
                            userEntry = { username: product.username, products: [] };
                            acc.push(userEntry);
                        }
                        userEntry.products.push(product);
                        return acc;
                    }, []).map(({ username, products }, idx) => (
                        <div key={idx} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px", borderRadius: "5px" }}>
                            <p><strong>User:</strong> {username} has posted these products:</p>
                            <ul>
                                {products.map((product, idx) => (
                                    <li key={idx}>
                                        <strong>Type:</strong> {product.type}, <strong>Brand:</strong> {product.brand}, <strong>Quantity:</strong> {product.quantity}
                                        {product.description && ` | Description: ${product.description}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RemainPage;