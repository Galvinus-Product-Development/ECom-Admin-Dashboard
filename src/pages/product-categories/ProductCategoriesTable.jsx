import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import "react-toastify/dist/ReactToastify.css";
import './ProductCategoriesTable.css';

const ProductCategoriesTable = ({ categories, onEdit, onDelete, loading }) => {  
    const [sortedCategories, setSortedCategories] = useState([]);  
  const [sortDirection, setSortDirection] = useState('asc');  

  useEffect(() => {
    setSortedCategories(categories);
}, [categories]); 

const handleSort = () => {
    const sorted = [...sortedCategories].sort((a, b) => {
        if (a.category_name.toLowerCase() < b.category_name.toLowerCase()) return sortDirection === "asc" ? -1 : 1;
        if (a.category_name.toLowerCase() > b.category_name.toLowerCase()) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    setSortedCategories(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
}; 


  return (  
    <div className="product-categories-table">  
      <div className="table-header">  
        <h2>  
           Product Categories Table 
        </h2>  

      </div>  

      {loading ? (
                <div>Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={handleSort}>Name {sortDirection === "asc" ? "▲" : "▼"}</th>
                            <th>Parent Category</th>
                           {/*  <th>Move</th> */}
                            <th>Active</th>                    
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCategories.map((category) => (
                            <tr key={category.product_category_id}>
                                <td>{category.category_name}</td>
                                <td>{category.parent_category_name || "None"}</td>
                        
                                <td>{category.status === "active" ? "Yes" : "No"}</td> 
                                <td>
                                    <button onClick={() => onEdit(category)} aria-label="Edit category">
                                        <FiEdit />
                                    </button>
                                    <button onClick={() => onDelete(category.product_category_id)} aria-label="Delete category">
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>  
  );  
};  

ProductCategoriesTable.propTypes = {
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  
export default ProductCategoriesTable;  