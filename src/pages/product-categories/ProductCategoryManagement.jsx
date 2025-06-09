// ProductCategoryManagement.jsx
import { useEffect, useState } from 'react';
//import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import EditCategory from './EditCategory';
import Pagination from './Pagination';
import ProductCategoriesTable from './ProductCategoriesTable';
import './ProductCategoryManagement.css';
import TopBar from './TopBar';

const ProductCategoryManagement = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // We'll store the category that needs to be edited
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  // Search and Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc'); // default sort by name


  useEffect(() => {
    fetchCategories();
}, []);

const fetchCategories = async () => {
    setLoading(true);
    try {
        const response = await api.get("/product-categories");
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

const handleUpdateCategory = async (updatedCategory) => {
    try {
        
        await fetchCategories();
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
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

// Filter and sort categories
const filteredCategories = categories
  .filter(cat =>
    cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOption === 'name-asc') {
      return a.category_name.trim().toLowerCase().localeCompare(b.category_name.trim().toLowerCase());
    }
    else if (sortOption === 'name-desc') {
        return b.category_name.trim().toLowerCase().localeCompare(a.category_name.trim().toLowerCase());
      } else if (sortOption === 'status') {
      return a.status.trim().toLowerCase().localeCompare(b.status.trim().toLowerCase());
    }
    return 0;
  });


// Pagination logic
const indexOfLastCategory = currentPage * categoriesPerPage;
const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);



  return (
    <div className="product-category-management-container">
      <h1>Product Category Management</h1>

       {/* Top Section: Search, Sort, New Category Button */}
                <TopBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            onNewCategory={handleOpenNewCategory}
            />

            
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
            <Pagination
                currentPage={currentPage}
                itemsPerPage={categoriesPerPage}
                totalItems={filteredCategories.length}
                handlePageChange={paginate}
                />


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
