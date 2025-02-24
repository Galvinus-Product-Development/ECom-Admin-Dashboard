import React from "react";
import SummaryCard from "./SummaryCard";
import "./OrderSummary.css"; // Importing the CSS file

const OrderSummary = ({ orders }) => {
  const totalRevenue = orders
    .reduce((sum, order) => sum + order.totalAmount, 0)
    .toFixed(2);
  const averageOrderValue = (totalRevenue / orders.length).toFixed(2);

  return (
    <div className="order-summary-container">
      <SummaryCard title="Total Orders" value={orders.length} color="text-primary" />
      <SummaryCard
        title="Pending Orders"
        value={orders.filter((order) => order.status === "pending").length}
        color="text-warning"
      />
      <SummaryCard
        title="Total Revenue"
        value={`$${totalRevenue}`}
        color="text-success"
      />
      <SummaryCard
        title="Average Order Value"
        value={`$${averageOrderValue}`}
        color="text-info"
      />
    </div>
  );
};

export default OrderSummary;
