import React from "react";
import "./Pagination.css";

const Pagination = ({
  filteredInventory,
  itemsPerPage,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="inventory-pagination-container">
      {/* <div className="inventory-pagination-info">
        Showing{" "}
        <span className="font-medium">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to
        <span className="font-medium">
          {Math.min(currentPage * itemsPerPage, filteredInventory.length)}
        </span>{" "}
        of <span className="font-medium">{filteredInventory.length}</span> items
      </div> */}
      <div className="inventory-pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
