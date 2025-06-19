import { useEffect, useState } from "react";
import { FaCopy, FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteCoupon, fetchCoupons } from "../../services/api";
import ConfirmationModal from "./ConfirmationModal";
import "./CouponAndDiscount.css";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";

const CouponAndDiscount = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [couponsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        setLoading(true);
        const response = await fetchCoupons({
          page: currentPage,
          limit: couponsPerPage,
          search: searchTerm
        });
        console.log('API Response:', response); 
        // Update based on your API response structure
        setCoupons(response.data.data || []);
        setTotalCount(response.data.total || 0);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        alert("Failed to load coupons. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, [currentPage, searchTerm]);

  const handleCreateClick = () => {
    navigate("/add-coupon");
  };

  const handleEditClick = (couponId) => {
    navigate(`/coupons/edit/${couponId}`);
  };

  const handleViewClick = (couponId) => {
    navigate(`/coupons/view/${couponId}`);
  };

  const handleDuplicateClick = (couponId) => {
    navigate(`/coupons/duplicate/${couponId}`);
  };

  const handleDeleteClick = (coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCoupon(couponToDelete.coupon_id);
      setCoupons(coupons.filter(c => c.coupon_id !== couponToDelete.coupon_id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete coupon:", error);
      alert("Failed to delete coupon. Please try again.");
    }
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} - ${end}`;
  };

  const formatUsage = (usage) => {
    return `${usage.current_usage_count}/${usage.usage_limit_value || '∞'}`;
  };

  const formatValue = (reward) => {
    if (!reward) return '-';
    if (reward.discount_value_type === 'percentage') {
      return `${reward.discount_value}%`;
    }
    return `$${reward.discount_value}`;
  };

  return (
    <div className="coupon-container">
      <div className="coupon-header">
        <h2>Coupons and Discounts</h2>
        <div className="coupon-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="create-btn" onClick={handleCreateClick}>
            Create New +
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="coupon-card">
            <div className="table-header">
              <span>Discount Name</span>
              <span>Code</span>
              <span>Discount Type</span>
              <span>Value</span>
              <span>Uses</span>
              <span>Start & End Date</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <div className="table-row" key={coupon.coupon_id}>
                  <span>{coupon.discount_name}</span>
                  <span className="coupon-code">{coupon.discount_code}</span>
                  <span>{coupon.discount_type.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{formatValue(coupon.rewards?.[0])}</span>
                  <span>{formatUsage(coupon)}</span>
                  <span>{formatDateRange(coupon.start_date, coupon.end_date)}</span>
                  <span>
                    <StatusBadge status={coupon.status} />
                  </span>
                  <span className="actions">
                    <FaEdit 
                      onClick={() => handleEditClick(coupon.coupon_id)} 
                      title="Edit"
                    />
                    <FaEye 
                      onClick={() => handleViewClick(coupon.coupon_id)} 
                      title="View"
                    />
                    <FaCopy 
                      onClick={() => handleDuplicateClick(coupon.coupon_id)} 
                      title="Duplicate"
                    />
                    <FaTrash 
                      onClick={() => handleDeleteClick(coupon)} 
                      title="Delete"
                      className="delete-icon"
                    />
                  </span>
                </div>
              ))
            ) : (
              <div className="no-results">
                No coupons found. Create your first coupon!
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalCount}
            itemsPerPage={couponsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Coupon"
        message={`Are you sure you want to delete "${couponToDelete?.discount_name}" (${couponToDelete?.discount_code})?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CouponAndDiscount;