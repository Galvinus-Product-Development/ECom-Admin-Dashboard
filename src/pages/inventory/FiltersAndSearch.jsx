import React from "react";
import { Search, RefreshCw } from "lucide-react";
import "./FiltersAndSearch.css"; // Import the CSS file

export default function FiltersAndSearch({
  filter,
  setFilter,
  search,
  setSearch,
  setShowRestockModal,
  selectedItems,
  setSelectedItems,
  setCurrentPage,
}) {
  return (
    <div className="filter-container">
      <div className="filters-search-wrapper">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="search"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="inventory-search-input"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="filter-dropdown"
        >
          <option value="all">All Items</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>

        <button
          onClick={() => {
            setShowRestockModal(true);
          }}
          className="restock-button"
        >
          <RefreshCw size={20} />
          Bulk Restock ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}
