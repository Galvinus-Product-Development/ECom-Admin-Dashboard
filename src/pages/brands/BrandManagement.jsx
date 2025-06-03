// src/pages/brands/BrandManagement.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import "./BrandManagement.css";
import NewBrand from "./NewBrand";
import BrandTable from "./BrandTable";
import EditBrand from "./EditBrand";

const BrandManagement = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNewBrandModal, setShowNewBrandModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(10);

  // Search and Sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await api.get("/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseEdit = () => {
    setSelectedBrand(null);
  };

  // After updating a brand, refresh the list.
  const handleUpdateBrand = async (updatedBrand) => {
    try {
      await fetchBrands();
      toast.success("Brand updated successfully");
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand");
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await api.delete(`/brands/${id}`);
      setBrands(brands.filter((b) => b.brand_id !== id));
      toast.success("Brand deleted successfully");
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand");
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  // const handleSortChange = (e) => setSortOption(e.target.value);

  // Filter and sort brands using brand_name
  const filteredBrands = brands
    .filter((brand) =>
      brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.brand_name.localeCompare(b.brand_name);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands.slice(
    indexOfFirstBrand,
    indexOfLastBrand
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="brand-management-container">
      <h2>Brand Management</h2>

      {/* Top Bar: Search, Sort, New Brand Button */}
      <div className="top-bar1">
        <div className="brand-search-sort-container">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* <select value={sortOption} onChange={handleSortChange}>
            <option value="name">Sort by Name</option>
          </select> */}
        </div>
        <button
          className="new-brand-button"
          onClick={() => setShowNewBrandModal(true)}
        >
          + New Brand
        </button>
      </div>

      {/* Brand Table */}
      <BrandTable
        brands={currentBrands}
        onEdit={handleEditClick}
        onDelete={handleDeleteBrand}
        loading={loading}
      />

      {/* Edit Brand Modal */}
      {selectedBrand && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditBrand
              brandId={selectedBrand.brand_id}
              onUpdateBrand={handleUpdateBrand}
              onClose={handleCloseEdit}
            />
          </div>
        </div>
      )}

      {/* New Brand Modal */}
      {showNewBrandModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <NewBrand
              onClose={() => setShowNewBrandModal(false)}
              onBrandCreated={fetchBrands}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandManagement;
