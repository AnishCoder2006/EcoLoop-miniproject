import React from 'react'
import './refurbisher2.css';
export const Refurbishers = () => {
  return (
    <div>
        <h2>List Your Refurbished Products</h2>
        <form action="">
            <br />
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" />
<br />
            <label htmlFor="productDescription">Specifications:</label>
            <textarea id="productDescription" name="productDescription"></textarea>
<br />
<label htmlFor="">
    Parts Repaired:
</label>
            <input type="text" id="partsRepaired" name="partsRepaired" />
<br />
<label htmlFor="OriginalPrice">Original Price:</label>
            <input type="text" id="OriginalPrice" name="OriginalPrice" />
<br />
            <label htmlFor="refurbishedPrice">Refurbished Price:</label>
            <input type="text" id="refurbishedPrice" name="refurbishedPrice" />
            <br />
            <label htmlFor="warrantyPeriod">Warranty Period:</label>
            <input type="number" id="warrantyPeriod" name="warrantyPeriod" />
            <br />
            <label htmlFor="productImage">Product Image:</label>
            <input type="file" id="productImage" accept="image/*" name="productImage" />
<br />

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
export default Refurbishers;