import React from "react";
import "./InventoryTable.css";
import { ArrowUpDown } from "lucide-react"; // Assuming this import is correct

const InventoryTable = ({
  filteredInventory,
  getStockIndicator,
  getStockStatusColor,
  selectedItems,
  setSelectedItems,
  setShowRestockModal,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  paginatedInventory,
}) => {
  return (
    <div className="inventory-table-container">
      <div className="table-scroll">
        <table className="inventory-table">
          <thead className="inventory-table-header">
            <tr>
              <th className="header-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.length === paginatedInventory.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(
                        paginatedInventory.map((item) => item.id)
                      );
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                  className="checkbox-input"
                />
              </th>
              <th className="sortable-header">
                <button
                  onClick={() => {
                    if (sortBy === "name") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("name");
                      setSortOrder("asc");
                    }
                  }}
                >
                  Product
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="sortable-header">
                <button
                  onClick={() => {
                    if (sortBy === "category") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("category");
                      setSortOrder("asc");
                    }
                  }}
                >
                  Category
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="sortable-header">
                <button
                  onClick={() => {
                    if (sortBy === "stock") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("stock");
                      setSortOrder("asc");
                    }
                  }}
                >
                  Stock Level
                  <ArrowUpDown size={14} />
                </button>
              </th>
              {/* <th className="inventory-table-header">Location</th> */}
              <th className="inventory-table-header">Status</th>
              <th className="inventory-table-header">Last Restocked</th>
              <th className="inventory-table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="inventory-table-body">
            {paginatedInventory.map((item, id) => (
              <tr key={id} className="inventory-table-row">
                <td className="row-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item.id]);
                      } else {
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item.id)
                        );
                      }
                    }}
                    className="checkbox-input"
                  />
                </td>
                <td className="product-cell">
                  <div className="product-info">
                    <div className="product-image">
                      <img src={item.images[0]} alt={item.name} />
                    </div>
                    <div className="product-details">
                      <div className="product-name">{item.name}</div>
                      <div className="product-description">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="category-cell">
                  <span className="category-tag">{item.category}</span>
                </td>
                <td className="stock-cell">
                  <div className="stock-info">
                    {getStockIndicator(item)}
                    <span className="stock-count">{item.stock} units</span>
                  </div>
                </td>
                {/* <td className="location-cell">{item.locationCode}</td> */}
                <td className="status-cell">
                  <span
                    className={`status-tag ${getStockStatusColor(item.status)}`}
                  >
                    {item.status
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </td>
                <td className="restock-cell">
                  {item.lastRestocked.toLocaleDateString()}
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => {
                        setSelectedItems([item.id]);
                        setShowRestockModal(true);
                      }}
                      className="restock-button"
                    >
                      Restock
                    </button>
                    <button className="move-button">Move</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
