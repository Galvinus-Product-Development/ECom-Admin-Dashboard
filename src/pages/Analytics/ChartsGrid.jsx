import React from "react";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import './ChartsGrid.css';

function ChartsGrid({ revenueData, categoryData, conversionData }) {
  return (
    <div className="charts-grid">
      {/* Revenue Trend */}
      <div className="chart-card">
        <h3>Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders & Customers */}
      <div className="chart-card">
        <h3>Orders & Customers</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#10B981"
              fill="#D1FAE5"
            />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#6366F1"
              fill="#E0E7FF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by Category */}
      <div className="chart-card">
        <h3>Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Funnel */}
      <div className="chart-card">
        <h3>Conversion Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1">
              {conversionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#6366F1${(100 - index * 20).toString(16)}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsGrid;
