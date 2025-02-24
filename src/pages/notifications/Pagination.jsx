import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, filteredNotifications, ITEMS_PER_PAGE, handlePageChange }) => {
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredNotifications.length)}
        </span>{' '}
        of{' '}
        <span className="font-medium">{filteredNotifications.length}</span> notifications
      </div>
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button previous-button"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active-page' : 'hover-page'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
