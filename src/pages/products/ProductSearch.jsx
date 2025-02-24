import React from "react";
import { Search } from "lucide-react";
import "./ProductSearch.css"; // Import the CSS file
const ProductSearch = ({ search, setSearch ,setCurrentPage}) => (
  <div className="product-search-container">
    <Search className="product-search-icon" size={20} />
    <input
      type="search"
      placeholder="Search products..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="search-input"
    />
  </div>
);

export default ProductSearch;
