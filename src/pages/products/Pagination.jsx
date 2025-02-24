import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  filteredProducts,
  handlePageChange,
}) => {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
        </span>{' '}of{' '}
        <span className="font-medium">{filteredProducts.length}</span> products
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
            className={`pagination-button ${currentPage === page ? "active" : ""}`}
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
