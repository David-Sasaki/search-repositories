import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchRepos } from "../../hooks/useFetchRepos";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import "../assets/styles/TableView.css";

const TableView: React.FC<{ query: string }> = ({ query }) => {
  const pageSize = Number(process.env.REACT_APP_PAGE_SIZE_FOR_TABLE_VIEW);
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const debouncedPage = useDebounce(
    page,
    Number(process.env.REACT_APP_DELAY_TIME)
  );
  const repositories = useFetchRepos(query, debouncedPage, pageSize);

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
