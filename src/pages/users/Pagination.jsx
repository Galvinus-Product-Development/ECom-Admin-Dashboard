import React from "react";
import "./Pagination.css"; // Import the CSS file

export const Pagination = ({
  totalPages,
  currentPage,
  ITEMS_PER_PAGE,
  filteredUsers,
  handlePageChange,
}) => (
  <div className="user-pagination-container">
    {/* <div className="pagination-info">
      Showing{" "}
      <span className="pagination-bold">
        {(currentPage - 1) * ITEMS_PER_PAGE + 1}
      </span>{" "}
      to{" "}
      <span className="pagination-bold">
        {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}
      </span>{" "}
      of <span className="pagination-bold">{filteredUsers.length}</span> results
    </div> */}
    <div className="pagination-controls">
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
            currentPage === page ? "pagination-active" : ""
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
