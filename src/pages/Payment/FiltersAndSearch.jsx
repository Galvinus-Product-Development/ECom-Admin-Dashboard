import React from 'react';
import { Search } from 'lucide-react';
import './FiltersAndSearch.css';

const FiltersAndSearch = ({ search, setSearch, filter, setFilter, dateRange, setDateRange }) => (
  <div className="filters-and-search">
    {/* Search and Dropdown */}
    <div className="filters-and-search__wrapper">
      <div className="filters-and-search__search">
        <Search className="filters-and-search__search-icon" size={20} />
        <input
          type="search"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filters-and-search__input"
        />
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filters-and-search__dropdown"
      >
        <option value="all">All Payments</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
        <option value="refunded">Refunded</option>
      </select>
    </div>

    {/* Date Range */}
    <div className="filters-and-search__date-range">
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))} 
        className="filters-and-search__date-input"
      />
      <span className="filters-and-search__date-separator">to</span>
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))} 
        className="filters-and-search__date-input"
      />
    </div>
  </div>
);

export default FiltersAndSearch;
