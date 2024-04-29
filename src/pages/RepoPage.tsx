import React, { useEffect, useState } from "react";
import "../assets/styles/RepoPage.css";
import fetchRepositories from "../services/api";
import SearchBar from "../components/SearchBar";
import SelectViewOption from "../components/SelectViewOption";

const RepoPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("tableView");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      fetchRepositories(query).then((data) => {
        setRepositories(data?.items || []);
        setIsLoading(false);
      });
    }
  }, [query]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleOptionChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };

  useEffect(() => {
    fetchRepositories(query);
  }, [query]);

  return (
    <div className="repo-container">
      <div className="search-repo-box">
        <SearchBar query={query} onQueryChange={handleQueryChange} />
        <SelectViewOption
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
        />
      </div>
      <div className="view-repo-box"></div>
    </div>
  );
};

export default RepoPage;
