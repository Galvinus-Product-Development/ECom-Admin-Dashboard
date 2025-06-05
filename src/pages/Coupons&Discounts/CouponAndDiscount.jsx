import React from "react";
import "./CouponAndDiscount.css";
import { FaEdit, FaCopy, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const dummyCoupons = [
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },

  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  {
    name: "Welcome Offer",
    code: "WLCM50",
    type: "Order Discount",
    value: "20%",
    usage: "25/100",
    dateRange: "01, Jun - 05, Jun 2025",
    status: "Active",
  },
  // Add more entries as needed
];

const CouponAndDiscount = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/add-coupon"); // Update the route if your route is different
  };
  return (
    <div className="coupon-container">
      {/* <div className="header">
        <h2>Coupon and Discount</h2>
        <button className="create-btn">Create New +</button>
      </div> */}
      <div className="coupon-header">
        <h2>Coupons and Discounts</h2>
        <button className="create-btn" onClick={handleCreateClick}>
          Create New +
        </button>
      </div>

      <div className="coupon-card">
        <div className="table-header">
          <span>Discount Name</span>
          <span>Code</span>
          <span>Discount Type</span>
          <span>Value</span>
          <span>Uses</span>
          <span>Start & End Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {dummyCoupons.map((coupon, index) => (
          <div className="table-row" key={index}>
            <span>{coupon.name}</span>
            <span>{coupon.code}</span>
            <span>{coupon.type}</span>
            <span>{coupon.value}</span>
            <span>{coupon.usage}</span>
            <span>{coupon.dateRange}</span>
            <span className="status">
              <span className="dot" /> {coupon.status}
            </span>
            <span className="actions">
              <FaEdit onClick={handleCreateClick} />
              <FaEye />
              <FaTrash />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponAndDiscount;
