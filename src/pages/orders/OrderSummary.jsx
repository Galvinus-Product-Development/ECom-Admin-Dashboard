import "./OrderSummary.css"; // Importing the CSS file
import SummaryCard from "./SummaryCard";

const OrderSummary = ({ orders }) => {
  const totalRevenue = orders
    .reduce((sum, order) => sum + order.totalAmount, 0)
    .toFixed(2);
  const averageOrderValue = (totalRevenue / orders.length).toFixed(2);

  return (
    <div className="order-summary-container">
      <SummaryCard title="Total Orders" value={orders.length} color="summary-default" />
      <SummaryCard
        title="Item Orders"
        value={orders.filter((order) => order.status === "pending").length}
        color="summary-ocean"
      />
      <SummaryCard
        title="Return Orders"
        value={`$${totalRevenue}`}
        color="summary-red"
      />
      <SummaryCard
        title="Orders Fulfilled"
        value={`$${averageOrderValue}`}
        color="summary-blue"
      />
      <SummaryCard
        title="Orders Delivered"
        value={`$${averageOrderValue}`}
        color="summary-green"
      />
    </div>
  );
};

export default OrderSummary;
