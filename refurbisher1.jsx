import React from "react";
import "./refurbisher1.css";
import relogo from "./relogo.webp";
import reimg from "./re.avif";
import { Link } from "react-router-dom";

const Refurbisher1 = () => {
  return (
    <div className="refurbisher-container">
      <div className="header-row">
        <img src={relogo} alt="Logo" className="logo" />
        <h1>Refurbisher Page</h1>
      </div>

      <nav className="nav1">
        <ul>
          <li className="Home active">
            <Link to="/home">Home</Link>
          </li>
          <li className="Buy">
            <Link to="/remainpage">Buy</Link>
          </li>
          <li className="Sell">
            <Link to="/refurbisher2">Sell</Link> {/* ✅ Fixed Navigation */}
          </li>
        </ul>
      </nav>

      <div className="content-row">
        <img src={reimg} alt="Refurbish" className="reimg" />
        <p>
          Buy old products, refurbish and upgrade them to sell at an optimal rate, gaining profit while promoting sustainable development.
          We collect old products from your doorstep and refurbish them at our facility, ensuring they meet the latest standards before resale.
          Our team of experts ensures every product meets quality standards before it is sold.
        </p>
      </div>
    </div>
  );
};

export default Refurbisher1;