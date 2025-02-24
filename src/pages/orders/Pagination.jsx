import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, ITEMS_PER_PAGE, filteredOrders, totalPages, handlePageChange }) => {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
        <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}</span> of{' '}
        <span className="font-medium">{filteredOrders.length}</span> orders
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-page-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
