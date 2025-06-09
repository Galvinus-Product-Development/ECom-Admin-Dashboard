import './Pagination.css';

const Pagination = ({ currentPage, ITEMS_PER_PAGE, filteredPayments, totalPages, handlePageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const totalVisible = 5;
    const leftSide = 2;
    const rightSide = 2;

    if (totalPages <= totalVisible + leftSide + rightSide) {
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
        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
        <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredPayments.length)}</span> of{' '}
        <span className="font-medium">{filteredPayments.length}</span> payments
      </div>
      <div className="pagination-controls">
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
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`pagination-page-button ${currentPage === page ? 'active' : ''}`}
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

export default Pagination;
