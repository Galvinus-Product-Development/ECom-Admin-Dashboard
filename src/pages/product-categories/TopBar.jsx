// components/TopBar.jsx
import './TopBar.css';


const TopBar = ({ searchTerm, onSearchChange, sortOption, onSortChange, onNewCategory }) => {
    return (
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={onSearchChange}
        />
  
        <select value={sortOption} onChange={onSortChange}>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="status">Sort by Status</option>
                
        </select>
  
        <button onClick={onNewCategory}>+ New Category</button>
      </div>
    );
  };
  
  export default TopBar;
  