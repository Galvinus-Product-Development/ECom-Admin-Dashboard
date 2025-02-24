import React from "react";
import { Shield, Users, Lock, AlertTriangle } from "lucide-react";
import "./SummaryCards.css";

const SummaryCards = ({ roles, mockPermissions }) => {
  return (
    <div className="dashboard-stats-container">
      <div className="dashboard-stat-card">
        <div className="stat-card-header">
          <div>
            <p className="stat-title">Total Roles</p>
            <p className="stat-value">{roles.length}</p>
          </div>
          <Shield className="stat-icon-blue" size={24} />
        </div>
      </div>
      <div className="dashboard-stat-card">
        <div className="stat-card-header">
          <div>
            <p className="stat-title">Total Users</p>
            <p className="stat-value">
              {roles.reduce((sum, role) => sum + role.users, 0)}
            </p>
          </div>
          <Users className="stat-icon-green" size={24} />
        </div>
      </div>
      <div className="dashboard-stat-card">
        <div className="stat-card-header">
          <div>
            <p className="stat-title">Permissions</p>
            <p className="stat-value">{mockPermissions.length}</p>
          </div>
          <Lock className="stat-icon-purple" size={24} />
        </div>
      </div>
      <div className="dashboard-stat-card">
        <div className="stat-card-header">
          <div>
            <p className="stat-title">Security Score</p>
            <p className="stat-value green-text">92%</p>
          </div>
          <AlertTriangle className="stat-icon-yellow" size={24} />
        </div>
      </div>
    </div>
  );
};


export default SummaryCards;
