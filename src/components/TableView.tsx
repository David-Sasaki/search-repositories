import React, { useState, useEffect, ReactNode } from "react";
import "../assets/styles/TableView.css";
import fetchRepositories from "../services/api";
import getFieldsFromJsonList from "../utils/jsonParser";
import { useDebounce } from "../hooks/useDebounce";

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

const TableView: React.FC<{ query: string }> = ({ query }) => {
  const pageSize = Number(process.env.REACT_APP_PAGE_SIZE_FOR_TABLE_VIEW);
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const debouncedPage = useDebounce(
    page,
    Number(process.env.REACT_APP_DELAY_TIME)
  );

  useEffect(() => {
    if (query.length > 0) {
      fetchRepositories(query, debouncedPage, pageSize)
        .then((data) => {
          setRepositories(getFieldsFromJsonList(data?.items || []));
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          setRepositories([]);
        });
    }
  }, [debouncedPage, query]);

  const handleFirstPage = () => {
    setPage(0);
  };

  const handlePrevPage = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setColumns(["No", ...Object.keys(repositories[0] || {})]);
  }, [repositories]);

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
          {repositories.map((row, index) => (
            <tr key={index}>
              <td>{debouncedPage * pageSize + index + 1}</td>
              {Object.values(row).map((value, valueIndex) => (
                <td key={valueIndex}>{value as ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handleFirstPage} disabled={debouncedPage === 0}>
          First Page
        </button>
        <button onClick={handlePrevPage} disabled={debouncedPage === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={repositories.length === 0}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TableView;
