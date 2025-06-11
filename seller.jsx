import React, { useState } from 'react';
import './pro.css';
import tvImg from './tv1.png';
import lapImg from './lap1.png';
import mobImg from './mob1.png';
import washImg from './wash.png';
import othersImg from './others.png';

const Seller = () => {
  const [form, setForm] = useState({
    tvBrand: '',
    tvQty: '',
    laptopBrand: '',
    laptopQty: '',
    mobileBrand: '',
    mobileQty: '',
    washBrand: '',
    washQty: '',
    otherBrand: '',
    otherQty: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username;

    // Build products array
    const products = [
      { type: 'tv', brand: form.tvBrand, quantity: form.tvQty, description: form.description, username },
      { type: 'laptop', brand: form.laptopBrand, quantity: form.laptopQty, description: form.description, username },
      { type: 'mobile', brand: form.mobileBrand, quantity: form.mobileQty, description: form.description, username },
      { type: 'washingMachine', brand: form.washBrand, quantity: form.washQty, description: form.description, username },
      { type: 'others', brand: form.otherBrand, quantity: form.otherQty, description: form.description, username }
    ];

    // Filter out products with empty brand, quantity, or username
    const filteredProducts = products.filter(
      p => p.brand && p.quantity && p.username
    );

    await fetch('http://localhost:3000/add-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: filteredProducts })
    });

    alert('Form submitted!\n' + JSON.stringify(filteredProducts, null, 2));
  };

  return (
    <div className="container">
      <h1 className="heading">Sell Your Old Products</h1>
      <form id="sellForm" onSubmit={handleSubmit}>
        <div className="tv">
          <h1>T.V.</h1>
          <img src={tvImg} alt="TV" />
          <p>
            Enter Brand Name:
            <input
              type="text"
              name="tvBrand"
              placeholder="BrandName"
              value={form.tvBrand}
              onChange={handleChange}
            /><br />
            Enter Quantity:
            <input
              type="number"
              name="tvQty"
              value={form.tvQty}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="lap">
          <h1>Laptop</h1>
          <img src={lapImg} alt="Laptop" />
          <p>
            Enter Brand Name:
            <input
              type="text"
              name="laptopBrand"
              placeholder="BrandName"
              value={form.laptopBrand}
              onChange={handleChange}
            /><br />
            Enter Quantity:
            <input
              type="number"
              name="laptopQty"
              value={form.laptopQty}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="mob">
          <h1>SmartPhone</h1>
          <img src={mobImg} alt="SmartPhone" />
          <p>
            Enter Brand Name:
            <input
              type="text"
              name="mobileBrand"
              placeholder="BrandName"
              value={form.mobileBrand}
              onChange={handleChange}
            /><br />
            Enter Quantity:
            <input
              type="number"
              name="mobileQty"
              value={form.mobileQty}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="washing-machine">
          <h1>Washing Machine</h1>
          <img src={washImg} alt="Washing Machine" />
          <p>
            Enter Brand Name:
            <input
              type="text"
              name="washBrand"
              placeholder="BrandName"
              value={form.washBrand}
              onChange={handleChange}
            /><br />
            Enter Quantity:
            <input
              type="number"
              name="washQty"
              value={form.washQty}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="others">
          <h1>Others</h1>
          <img src={othersImg} alt="Others" />
          <p>
            Enter Brand Name:
            <input
              type="text"
              name="otherBrand"
              placeholder="BrandName"
              value={form.otherBrand}
              onChange={handleChange}
            /><br />
            Enter Quantity:
            <input
              type="number"
              name="otherQty"
              value={form.otherQty}
              onChange={handleChange}
            />
          </p>
        </div>
        <p>Description...</p>
        <textarea
          name="description"
          id="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Seller;