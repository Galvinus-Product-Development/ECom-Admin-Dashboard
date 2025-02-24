import React from "react";
import { Search } from "lucide-react";
import "./Filters.css"; // Importing the CSS file

const Filters = ({ search, setSearch, filter, setFilter, dateRange, setDateRange }) => (
  <div className="filter-container">
    <div className="filters-input-group">
      <div className="relative flex-1 max-w-md">
        <Search className="filters-icon" size={20} />
        <input
          type="search"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filters-search-input"
        />
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filters-dropdown"
      >
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
    <div className="filters-date-range">
      <div className="filters-date-input-group">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
          className="filters-date-input"
        />
        <span className="filters-date-to">to</span>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
          className="filters-date-input"
        />
      </div>
    </div>
  </div>
);

export default Filters;