// ProductCategoryManagement.jsx
import { useEffect, useState } from 'react';
//import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import EditCategory from './EditCategory';
//import NewCategory from './NewCategory';
import ProductCategoriesTable from './ProductCategoriesTable';
import './ProductCategoryManagement.css';

const ProductCategoryManagement = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // We'll store the category that needs to be edited
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);

  // Search and Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); // default sort by name


  useEffect(() => {
    fetchCategories();
}, []);

const fetchCategories = async () => {
    setLoading(true);
    try {
        const response = await api.get("/product-categories");
        // Create a map for quick lookup of parent categories
    /*    const categoryMap = response.data.reduce((map, category) => {
            map[category.product_category_id] = category;
            return map;
        }, {});

        // Enrich categories by adding parent category details
        const enrichedCategories = response.data.map(category => ({
            ...category,
            parent_category: categoryMap[category.parent_category_id] || null // Fetch parent details if available
        })); */
        setCategories(response.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
    } finally {
        setLoading(false);
    }
};
const handleEditClick = (category) => {
    setSelectedCategoryId(category);
};

const handleCloseEdit = () => {
    setSelectedCategoryId(null);
};

/*const handleAddCategory = async (categoryData) => {
    try {
        const response = await api.post("/product-categories", categoryData);
        setCategories([...categories, response.data]);
        toast.success("Category added successfully");
    } catch (error) {
        console.error("Error adding category:", error);
        toast.error("Failed to add category");
    }
};

 /**
     * This is called after successful update in EditCategory component.
     * @param {object} updatedCategory
     */
const handleUpdateCategory = async (updatedCategory) => {
    try {
        //const response = await api.put(`/product-categories/${id}`, updatedData);
        await fetchCategories();
       /* setCategories(categories.map((cat) => 
            cat.product_category_id === updatedCategory.product_category_id ? updatedCategory : cat
        ));*/
        toast.success("Category updated successfully");
        handleCloseEdit();
    } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Failed to update category");
    }
};

const handleDeleteCategory = async (id) => {
    try {
        await api.delete(`/product-categories/${id}`);
        setCategories(categories.filter((cat) => cat.product_category_id !== id));
        toast.success("Category deleted successfully");
    } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
    }
};
const handleOpenNewCategory = () => {
    navigate('/product-categories/new-category', {
        state: {
            openedFrom: 'ProductCategoryManagement',  // This acts like a prop
        }
    });
};

const handleSearchChange = (e) => setSearchTerm(e.target.value);
const handleSortChange = (e) => setSortOption(e.target.value);

// Filter and sort categories
const filteredCategories = categories.filter(cat =>
    cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
).sort((a, b) => {
    if (sortOption === 'name') {
        return a.category_name.localeCompare(b.category_name);
    } else if (sortOption === 'status') {
        return a.status.localeCompare(b.status);
    }
    return 0;
});

// Pagination logic
const indexOfLastCategory = currentPage * categoriesPerPage;
const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-category-management">
      <h2>Product Category Management</h2>

       {/* Top Section: Search, Sort, New Category Button */}
       <div className="top-bar">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <select value={sortOption} onChange={handleSortChange}>
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                </select>

                <button onClick={handleOpenNewCategory}>+ New Category</button>
            </div>
            
         { /*  <NewCategory 
                onAddCategory={handleAddCategory} 
                categories={categories} 
            />*/}

            <ProductCategoriesTable 
                categories={currentCategories} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteCategory} 
                loading={loading} 
            />

            {/* Pagination */}
            <div className="pagination-container">
                {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {selectedCategoryId && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                <EditCategory 
                    categoryId={selectedCategoryId.product_category_id} 
                    onUpdateCategory={handleUpdateCategory} 
                    //categories={categories} 
                    onClose={handleCloseEdit} 
                />
                 </div>
                 </div>
            )}
    </div>
  );
};

export default ProductCategoryManagement;
