import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const leftSide = 2;
    const rightSide = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = 1; i <= leftSide; i++) pages.push(i);

      if (currentPage > leftSide + 2) {
        pages.push('...');
      } else {
        for (let i = leftSide + 1; i < currentPage; i++) pages.push(i);
      }

      const start = Math.max(currentPage, leftSide + 1);
      const end = Math.min(currentPage + 1, totalPages - rightSide);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - rightSide - 1) {
        pages.push('...');
      } else {
        for (let i = end + 1; i < totalPages - rightSide + 1; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      }

      for (let i = totalPages - rightSide + 1; i <= totalPages; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing{' '}
        <span className="pagination-highlight">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{' '}
        to{' '}
        <span className="pagination-highlight">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{' '}
        of <span className="pagination-highlight">{totalItems}</span> items
      </div>

      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
          aria-label="Previous page"
        >
          &#8592;
        </button>

        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-button ${
                currentPage === page ? 'pagination-active' : 'pagination-hover'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          aria-label="Next page"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
