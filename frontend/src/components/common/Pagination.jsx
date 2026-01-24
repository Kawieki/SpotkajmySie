import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const goPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0 });
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <div className="pagination-info">
        Strona {currentPage} z {totalPages}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={goPrev}
          disabled={currentPage === 1}
        >
          ← Poprzednia
        </button>

        <button
          className="pagination-btn"
          onClick={goNext}
          disabled={currentPage === totalPages}
        >
          Następna →
        </button>
      </div>
    </>
  );
};

export default Pagination;
