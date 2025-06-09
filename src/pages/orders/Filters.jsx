import { Search } from "lucide-react";
import { useState } from "react";
import "./Filters.css"; // Importing the CSS file

const Filters = ({ search, setSearch, filter, setFilter, dateRange, setDateRange }) => {
  const [custom, setCustom] = useState(false);

  const handleDateRangeChange = (e) => {
    const value = e.target.value;
    setCustom(value === "custom");

    const today = new Date();
    let startDate = "";
    let endDate = today.toISOString().split("T")[0]; // today in yyyy-mm-dd

    if (value === "7") {
      startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split("T")[0];
    } else if (value === "30") {
      startDate = new Date(today.setDate(today.getDate() - 30)).toISOString().split("T")[0];
    } else if (value === "60") {
      startDate = new Date(today.setDate(today.getDate() - 60)).toISOString().split("T")[0];
    }

    if (value !== "custom") {
      setDateRange({ start: startDate, end: endDate });
    }
  };
  return (
    <div className="filter-container">
      <div className="filters-input-group">
        
          <Search className="filters-icon" size={20} />
          <input
            type="search"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filters-search-input"
          />
          
        <select onChange={handleDateRangeChange} className="filters-dropdown">
          <option value="">Date</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="60">Last 60 Days</option>
          <option value="custom">Custom Range</option>
        </select>

        {custom && (
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
    )}

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


      {/* {custom && (
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
      )} */}
    </div>
  );
};

export default Filters;