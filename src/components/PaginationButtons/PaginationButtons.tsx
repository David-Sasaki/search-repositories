import React from "react";
import "./PaginationButtons.css";

interface PaginationButtonsProps {
  page: number;
  repositories: any[];
  onPageChange: (value: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  page,
  repositories,
  onPageChange,
}) => {
  return (
    <div className="pagination-buttons">
      <button
        onClick={() => {
          onPageChange(0);
        }}
        disabled={page === 0}
      >
        First Page
      </button>
      <button
        onClick={() => {
          onPageChange(Math.max(0, page - 1));
        }}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          onPageChange(page + 1);
        }}
        disabled={repositories.length === 0}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationButtons;
