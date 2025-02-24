import React, { useState } from "react";

import TimeRangeSelector from "./TimeRangeSelector";
import KeyMetrics from "./KeyMetrics";
import ChartsGrid from "./ChartsGrid";
import AdditionalMetrics from "./AdditionalMetrics";
import './AnalyticsManagement.css';
// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 65000, orders: 420, customers: 180 },
  { month: "Feb", revenue: 59000, orders: 380, customers: 150 },
  { month: "Mar", revenue: 80000, orders: 510, customers: 210 },
  { month: "Apr", revenue: 81000, orders: 520, customers: 225 },
  { month: "May", revenue: 76000, orders: 490, customers: 200 },
  { month: "Jun", revenue: 88000, orders: 560, customers: 240 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3B82F6" },
  { name: "Clothing", value: 25, color: "#10B981" },
  { name: "Books", value: 20, color: "#F59E0B" },
  { name: "Home & Garden", value: 15, color: "#6366F1" },
  { name: "Others", value: 5, color: "#8B5CF6" },
];

const conversionData = [
  { stage: "Visits", value: 1000 },
  { stage: "Cart", value: 400 },
  { stage: "Checkout", value: 300 },
  { stage: "Purchase", value: 200 },
];

const AnalyticsManagement = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [compareMode, setCompareMode] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateGrowth = (current, previous) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  return (
    <div className="analytics-container">
      <div className="analytics-title section-spacing">
        <h1>Analytics Dashboard</h1>
        <p>Monitor your business performance and insights</p>
      </div>

      {/* Time Range Selector */}
      <TimeRangeSelector
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        compareMode={compareMode}
        setCompareMode={setCompareMode}
      />

      {/* Key Metrics */}
      <KeyMetrics formatCurrency={formatCurrency} />

      {/* Charts Grid */}
      <ChartsGrid revenueData={revenueData} categoryData={categoryData} conversionData={conversionData} />

      {/* Additional Metrics */}
      <AdditionalMetrics />
    </div>
  );
};

export default AnalyticsManagement;
