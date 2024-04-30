import React, { useState, useEffect, ReactNode } from "react";
import "../assets/styles/TableView.css";

interface Repository {
  createdAt: string;
  description: string;
  language: string;
  license: string;
  name: string;
  owner: string;
  score: number;
  size: number;
  url: string;
  watchersCount: number;
}

interface TableViewProps {
  repositories: Repository[];
}

const TableView: React.FC<TableViewProps> = ({ repositories }) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const pageSize = Number(process.env.REACT_APP_PAGE_SIZE || 10); // Default to 10 if not set
  const pageCount = Math.ceil(repositories.length / pageSize);

  useEffect(() => {
    setColumns(["No", ...Object.keys(repositories[0] || {})]);
  }, [repositories]);

  const handleFirstPage = () => {
    setPage(0);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(pageCount - 1, prev + 1));
  };

  const handleLastPage = () => {
    setPage(pageCount - 1);
  };

  return (
    <div className="table-view-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repositories
            .slice(
              page * pageSize,
              Math.min((page + 1) * pageSize, repositories.length)
            )
            .map((row, index) => (
              <tr key={index}>
                <td>{page * pageSize + index + 1}</td>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={valueIndex}>{value as ReactNode}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handleFirstPage} disabled={page === 0}>
          First Page
        </button>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={page >= pageCount - 1}>
          Next Page
        </button>
        <button onClick={handleLastPage} disabled={page >= pageCount - 1}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default TableView;
