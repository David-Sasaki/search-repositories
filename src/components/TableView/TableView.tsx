import React, { useState, useEffect } from "react";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchRepos } from "../../hooks/useFetchRepos";
import "./TableView.css";

const TableView: React.FC<{ query: string }> = ({ query }) => {
  const pageSize = Number(process.env.REACT_APP_PAGE_SIZE_FOR_TABLE_VIEW);
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const debouncedPage = useDebounce(
    page,
    Number(process.env.REACT_APP_DELAY_TIME)
  );
  const { repos, error } = useFetchRepos(query, debouncedPage, pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setColumns(["No", ...Object.keys(repos[0] || {})]);
  }, [repos]);

  useEffect(() => {
    if (error.length > 0) {
      window.alert(`Fetching error: ${error}`);
    }
  }, [error]);

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
          {repos.map((row, index) => (
            <tr>
              <td>{debouncedPage * pageSize + index + 1}</td>
              {Object.values(row).map((value) => (
                <td>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationButtons
        page={debouncedPage}
        repositories={repos}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableView;
