import React from "react";
import { Search } from "lucide-react";
import "./FiltersAndSearch.css";

function FiltersAndSearch({
  search,
  setSearch,
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="filters-search-container">
      <div className="filters-search-wrapper">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="search"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All Status</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All Categories</option>
          <option value="system">System</option>
          <option value="order">Orders</option>
          <option value="user">Users</option>
          <option value="security">Security</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersAndSearch;
