import React, { useState } from "react";
import "../assets/styles/RepoPage.css";
import SearchBar from "../components/SearchBar";
import SelectViewOption from "../components/SelectViewOption";
import TableView from "../components/TableView";
import CardView from "../components/CardView";
import { useDebounce } from "../hooks/useDebounce";

const RepoPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("tableView");
  const debouncedQuery = useDebounce(
    query,
    Number(process.env.REACT_APP_DELAY_TIME)
  );

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleOptionChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };

  return (
    <div className="repo-container">
      <div className="search-repo-box">
        <SearchBar query={query} onQueryChange={handleQueryChange} />
        <SelectViewOption
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
        />
      </div>
      <div className="view-repo-box">
        {selectedOption === "tableView" ? (
          <TableView query={debouncedQuery} />
        ) : (
          <CardView query={debouncedQuery} />
        )}
      </div>
    </div>
  );
};

export default RepoPage;
