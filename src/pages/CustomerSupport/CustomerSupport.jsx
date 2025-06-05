import React from "react";
import "./CustomerSupport.css";
import { FiFilter, FiMenu } from "react-icons/fi";
import TicketDropdownMenu from "./TicketDropdownMenu";

const tickets = [
  {
    id: "10001",
    customer: "xyz123@gmail.com",
    subject: "Delayed Delivery",
    category: "Order",
    status: "Open",
    updated: "2h ago",
    agent: "Abhishek",
  },
  {
    id: "10301",
    customer: "xyz123@gmail.com",
    subject: "Delayed Delivery",
    category: "Order",
    status: "Open",
    updated: "2h ago",
    agent: "Pratham",
  },
];

const CustomerSupport = () => {
  return (
    <div className="customer-support-container">
      <h1 className="customer-support-title">Customer Support</h1>

      <div className="customer-support-filters">
        <input
          type="text"
          placeholder="Search......."
          className="customer-support-search"
        />
        <button className="customer-support-filter-btn">
          Filter <FiFilter />
        </button>
        <button className="customer-support-category-btn">
          Category <FiMenu />
        </button>
      </div>

      <div className="customer-support-table">
        <div className="table-header">
          <div>Ticket</div>
          <div>Customer</div>
          <div>Subject</div>
          <div>Category</div>
          <div>Status</div>
          <div>Last Updated</div>
          <div>Agent</div>
          <div>Action</div>
        </div>

        {tickets.map((ticket, index) => (
          <div key={index} className="table-row">
            <div>{ticket.id}</div>
            <div>{ticket.customer}</div>
            <div>{ticket.subject}</div>
            <div>{ticket.category}</div>
            <div>{ticket.status}</div>
            <div>{ticket.updated}</div>
            <div>{ticket.agent}</div>
            <div>
              <TicketDropdownMenu />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSupport;
