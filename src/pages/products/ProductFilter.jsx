import React from "react";
import "./ProductFilter.css"; // Import the CSS file

const ProductFilter = ({ filter, setFilter ,setCurrentPage}) => (
  <select
    value={filter}
    onChange={(e) => {
      setFilter(e.target.value);
      setCurrentPage(1);
    }}
    className="product-filter" // Apply the custom class
  >
    <option value="all">All Categories</option>
    <option value="electronics">Electronics</option>
    <option value="wearables">Wearables</option>
    <option value="photography">Photography</option>
  </select>
);

export default ProductFilter;
