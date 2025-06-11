const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3003;

// ✅ Connect to MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Default MySQL password in XAMPP is empty
    database: "users2",
});

// ✅ Ensure Database Connection Works
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully!");
    }
});

// ✅ Test DB Connection (Optional Debugging)
db.query("SELECT 1", (err, results) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Database connection successful!");
    }
});

// ✅ Login Route (Authentication)
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and Password are required" });
    }

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];

        // ✅ Simple Token Generation (Replace with JWT in Production)
        const token = Buffer.from(`${user.username}:${Date.now()}`).toString("base64");

        res.json({ token, user });
    });
});

// ✅ Add Products Route (For Sellers to Post Products)
app.post("/add-products", (req, res) => {
    console.log("Received products:", req.body.products); // Debugging
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No products provided" });
    }

    const sql = "INSERT INTO products (username, type, brand, quantity, description) VALUES ?";
    const values = products.map((p) => [p.username, p.type, p.brand, p.quantity, p.description]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ message: "DB error" });
        }
        res.json({ message: "Products added successfully!" });
    });
});

// ✅ Fetch Products Route
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Failed to fetch products" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json(results);
    });
});

// ✅ Start the Server
app.listen(3003, () => console.log("Server running on port 3003"));