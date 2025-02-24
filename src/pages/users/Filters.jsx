import React from "react";
import "./Filters.css"; // Import the CSS file

export const Filters = ({
  filter,
  setFilter,
  search,
  setSearch,
  setShowUserModal,
  setCurrentPage,
}) => (
  <div className="filters-container">
    {" "}
    {/* Apply class for styling */}
    <div className="filter-inputs">
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="filter-select"
      >
        <option value="all">All Users</option>
        <option value="admin">Admins</option>
        <option value="seller">Sellers</option>
        <option value="customer">Customers</option>
      </select>
      <input
        type="search"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="filter-search"
      />
    </div>
    <button onClick={() => setShowUserModal(true)} className="add-user-btn">
      Add New User
    </button>
  </div>
);
