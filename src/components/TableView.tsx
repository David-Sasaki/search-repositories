import React, { useState, useEffect } from "react";
import "../assets/styles/TableView.css";
import fetchRepositories from "../services/api";
import getFieldsFromJsonList from "../utils/jsonParser";
import { useDebounce } from "../hooks/useDebounce";
import Repository from "../utils/types";
import PaginationButtons from "./PaginationButtons";

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
                <td key={valueIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationButtons
        page={debouncedPage}
        repositories={repositories}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableView;
