const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3002" }));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "login",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// **Signup Route with Logging**
app.post("/signup", (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    console.warn("⚠️ Signup failed: Missing fields");
    return res.status(400).json({ error: "All fields required" });
  }

  console.log(`📝 Signup request received for username: ${username}, role: ${role}`);

  const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, password, role], (err, result) => {
    if (err) {
      console.error("❌ Database error during signup:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`✅ User ${username} signed up successfully with ID: ${result.insertId}`);

    const token = jwt.sign(
      { userId: result.insertId, username, role },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Signup successful!", token, user: { username, role } });
  });
});

// **Login Route with Logging**
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.warn("⚠️ Login failed: Missing username or password");
    return res.status(400).json({ error: "Username and password required" });
  }

  console.log(`🔑 Login request received for username: ${username}`);

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("❌ Database error during login:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0 || results[0].password !== password) {
      console.warn(`⚠️ Login failed: Invalid credentials for username: ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    console.log(`✅ User ${username} logged in successfully`);

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  });
});

// **Protected Route Example**
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    console.warn("⚠️ Unauthorized access attempt to /profile");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || "yoursecret", (err, user) => {
    if (err) {
      console.warn("⚠️ Invalid token provided for /profile");
      return res.sendStatus(403);
    }
    console.log(`🔒 Profile accessed by user: ${user.username}`);
    res.json({ user });
  });
});

app.listen(3001, () => console.log("🚀 Server running on port 3001"));