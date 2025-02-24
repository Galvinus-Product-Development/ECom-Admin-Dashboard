import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, ITEMS_PER_PAGE, filteredPayments, totalPages, handlePageChange }) => {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span className="pagination-highlight">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
        <span className="pagination-highlight">
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredPayments.length)}
        </span> of{' '}
        <span className="pagination-highlight">{filteredPayments.length}</span> payments
      </div>
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-prev"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${
              currentPage === page ? 'pagination-active' : 'pagination-hover'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
