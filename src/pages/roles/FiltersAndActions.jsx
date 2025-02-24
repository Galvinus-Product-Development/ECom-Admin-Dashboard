import React from 'react';
import { Search, Plus } from 'lucide-react';
import './FiltersAndActions.css';

const FiltersAndActions = ({
  search,
  setSearch,
  selectedModule,
  setSelectedModule,
  modules,
  setSelectedRole,
  setShowRoleModal
}) => {
  return (
    <div className="roles-search-container">
      <div className="roles-search-flex">
        <div className="roles-search-input-container">
          <Search className="roles-search-icon" size={20} />
          <input
            type="search"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="roles-search-input"
          />
        </div>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="roles-module-select"
        >
          <option value="all">All Modules</option>
          {modules.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          setSelectedRole(null);
          setShowRoleModal(true);
        }}
        className="roles-create-btn"
      >
        <Plus size={20} />
        Create Role
      </button>
    </div>
  );
};

export default FiltersAndActions;
