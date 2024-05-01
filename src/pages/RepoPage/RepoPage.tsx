import React, { useState } from "react";
import CardView from "../../components/CardView/CardView";
import SearchBar from "../../components/SearchBar/SearchBar";
import SelectViewOption from "../../components/SelectViewOption/SelectViewOption";
import TableView from "../../components/TableView/TableView";
import { useDebounce } from "../../hooks/useDebounce";
import { ViewOption } from "../../types/types-index";
import "./RepoPage.css";

const RepoPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>(
    ViewOption.TableView
  );
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
        {selectedOption === ViewOption.TableView ? (
          <TableView query={debouncedQuery} />
        ) : (
          <CardView query={debouncedQuery} />
        )}
      </div>
    </div>
  );
};

export default RepoPage;
