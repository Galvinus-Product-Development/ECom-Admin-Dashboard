//import { Categories } from 'lucide-react';
import { useEffect, useState } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
//import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './ProductCategoriesTable.css';

const ProductCategoriesTable = ({ categories, onEdit, onDelete, loading }) => {  
    const [sortedCategories, setSortedCategories] = useState([]);  
  const [sortDirection, setSortDirection] = useState('asc');  

  useEffect(() => {
   /* const enrichedCategories = categories.map(category => ({
        ...category,
        parent_category: categories.find(cat => cat.product_category_id === category.parent_category_id) || null
    })); */
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

{/*const handleReorder = async (categoryId, newIndex) => {
    try {
        await api.put(`/product-categories/${categoryId}/reorder`, { newIndex });
        toast.success("Category reordered successfully");
    } catch (error) {
        console.error("Error reordering category:", error);
        toast.error("Failed to reorder category");
    }
}; */}

  return (  
    <div className="product-categories-table">  
      <div className="table-header">  
        <h2>  
           Product Categories  
        </h2>  
   {/*     <Link to="/product-categories/new" className="btn">  
          New Category  
        </Link>  */}
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
                             {/*    <td>
                                    <button 
                                        onClick={() => handleReorder(category.product_category_id, index - 1)}
                                        disabled={index === 0}
                                    >Up</button>
                                    <button 
                                        onClick={() => handleReorder(category.product_category_id, index + 1)}
                                        disabled={index === sortedCategories.length - 1}
                                    >Down</button>
                                </td> */}
                                <td>{category.status === "active" ? "Yes" : "No"}</td> 
                                <td>
                                    <button onClick={() => onEdit(category)}>Edit</button>
                                    <button onClick={() => onDelete(category.product_category_id)}>Delete</button>
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