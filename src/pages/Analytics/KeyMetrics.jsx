import React from "react";
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpCircle, ArrowDownCircle, Activity, Target 
} from 'lucide-react';
import "./KeyMetrics.css"

function KeyMetrics({ formatCurrency }) {
  return (
    <div className="key-metrics-container">
      <div className="key-metrics-card">
        <div className="key-metrics-header">
          <div>
            <p className="key-metrics-title">Total Revenue</p>
            <p className="key-metrics-value">{formatCurrency(88000)}</p>
            <div className="key-metrics-change positive">
              <ArrowUpCircle size={16} className="icon-green" />
              <span className="key-metrics-change-text">+12.5%</span>
            </div>
          </div>
          <div className="key-metrics-icon-container revenue-icon">
            <DollarSign size={24} className="icon-blue" />
          </div>
        </div>
      </div>
      <div className="key-metrics-card">
        <div className="key-metrics-header">
          <div>
            <p className="key-metrics-title">Total Orders</p>
            <p className="key-metrics-value">560</p>
            <div className="key-metrics-change positive">
              <ArrowUpCircle size={16} className="icon-green" />
              <span className="key-metrics-change-text">+8.2%</span>
            </div>
          </div>
          <div className="key-metrics-icon-container orders-icon">
            <ShoppingBag size={24} className="icon-green" />
          </div>
        </div>
      </div>
      <div className="key-metrics-card">
        <div className="key-metrics-header">
          <div>
            <p className="key-metrics-title">New Customers</p>
            <p className="key-metrics-value">240</p>
            <div className="key-metrics-change positive">
              <ArrowUpCircle size={16} className="icon-green" />
              <span className="key-metrics-change-text">+15.3%</span>
            </div>
          </div>
          <div className="key-metrics-icon-container customers-icon">
            <Users size={24} className="icon-purple" />
          </div>
        </div>
      </div>
      <div className="key-metrics-card">
        <div className="key-metrics-header">
          <div>
            <p className="key-metrics-title">Conversion Rate</p>
            <p className="key-metrics-value">20%</p>
            <div className="key-metrics-change negative">
              <ArrowDownCircle size={16} className="icon-red" />
              <span className="key-metrics-change-text">-2.1%</span>
            </div>
          </div>
          <div className="key-metrics-icon-container conversion-icon">
            <Target size={24} className="icon-orange" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyMetrics;
