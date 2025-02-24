import React from 'react';
import './Dashboard.css'; // Import the CSS file
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <p className="stat-card-label">{label}</p>
        <h3 className="stat-card-value">{value}</h3>
        <p className={`stat-card-trend ${trend >= 0 ? 'trend-positive' : 'trend-negative'}`}>
          {trend >= 0 ? '+' : ''}{trend}% from last month
        </p>
      </div>
      <div className="stat-card-icon-wrapper">
        <Icon size={24} className="stat-card-icon" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$54,239', trend: 12.5 },
    { icon: Users, label: 'Total Customers', value: '2,543', trend: 8.2 },
    { icon: ShoppingBag, label: 'Total Orders', value: '1,243', trend: -2.4 },
    { icon: TrendingUp, label: 'Conversion Rate', value: '3.24%', trend: 4.7 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stat-card-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default Dashboard;


