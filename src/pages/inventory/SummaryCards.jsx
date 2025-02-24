import React from "react";
import { Box, AlertTriangle, Truck, AlertCircle } from "lucide-react";
import './SummaryCards.css';

function SummaryCards({ inventory }) {
  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Total Products</p>
            <p className="summary-card-value">{inventory.length}</p>
          </div>
          <Box className="summary-card-icon text-blue" size={24} />
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Low Stock Items</p>
            <p className="summary-card-value text-yellow">
              {inventory.filter((item) => item.status === "low_stock").length}
            </p>
          </div>
          <AlertTriangle className="summary-card-icon text-yellow" size={24} />
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Out of Stock</p>
            <p className="summary-card-value text-red">
              {inventory.filter((item) => item.status === "out_of_stock").length}
            </p>
          </div>
          <AlertCircle className="summary-card-icon text-red" size={24} />
        </div>
      </div>
      <div className="summary-card">
        <div className="summary-card-content">
          <div>
            <p className="summary-card-label">Pending Restocks</p>
            <p className="summary-card-value text-blue">
              {
                inventory.filter((item) => item.stock <= item.reorderPoint)
                  .length
              }
            </p>
          </div>
          <Truck className="summary-card-icon text-blue" size={24} />
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
