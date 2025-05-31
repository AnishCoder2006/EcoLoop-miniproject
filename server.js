const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 5500;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Database connected successfully!");
});

app.post("/store-data", (req, res) => {
    const { tv, laptop, mobile, washingMachine, others, description } = req.body;
    const products = [
        { type: "tv", ...tv },
        { type: "laptop", ...laptop },
        { type: "mobile", ...mobile },
        { type: "washingMachine", ...washingMachine },
        { type: "others", ...others }
    ];
    let completed = 0;
    let hasError = false;
    let toInsert = products.filter(p => p.brand && p.quantity);

    if (toInsert.length === 0) {
        return res.json({ message: "No products to store." });
    }

    toInsert.forEach(product => {
        const sql = "INSERT INTO products(type,brand,quantity,description) VALUES(?,?,?,?)";
        db.query(sql, [product.type, product.brand, product.quantity, description], (err, result) => {
            completed++;
            if (err && !hasError) {
                hasError = true;
                return res.status(500).json({ message: "DB error" });
            }
            if (completed === toInsert.length && !hasError) {
                res.json({ message: "All products stored successfully!" });
            }
        });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));

