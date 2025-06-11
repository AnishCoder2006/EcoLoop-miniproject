import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added email field
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }), // Include email
      });

      const data = await res.json();

      if (res.ok && data.token && data.user) {
        onAuthSuccess(data.token, data.user);
        navigate("/dashboard"); // Redirect after successful signup
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup request failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label> {/* Added email input */}
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p>Select your role:</p>
        <div className="role-options">
          <label>
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={role === "buyer"}
              onChange={() => setRole("buyer")}
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />
            Seller
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="refurbisher"
              checked={role === "refurbisher"}
              onChange={() => setRole("refurbisher")}
            />
            Refurbisher
          </label>
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate("/login")}>Login Here</button>
    </div>
  );
};

export default Signup;