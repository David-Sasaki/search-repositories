import React, { useEffect, useState } from "react";
import "../assets/styles/RepoPage.css";
import fetchRepositories from "../services/api";
import SearchBar from "../components/SearchBar";
import SelectViewOption from "../components/SelectViewOption";
import TableView from "../components/TableView";
import CardView from "../components/CardView";
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

const RepoPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("tableView");
  const [repositoryJsonList, setRepositoryJsonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const debouncedQuery = useDebounce(
    query,
    Number(process.env.REACT_APP_DELAY_TIME)
  );

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setIsLoading(true);
      fetchRepositories(debouncedQuery).then((data) => {
        setRepositoryJsonList(data?.items || []);
        setIsLoading(false);
      });
    }
  }, [debouncedQuery]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleOptionChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };

  useEffect(() => {
    setRepositories(
      repositoryJsonList.map((item) => ({
        createdAt: item["created_at"] || "",
        description: item["description"] || "",
        language: item["language"] || "",
        license: item["license"] === null ? "" : item["license"]["name"] || "",
        name: item["name"] || "",
        owner: item["owner"] == null ? "" : item["owner"]["login"] || "",
        score: item["score"] || "",
        size: item["size"] || "",
        url: item["url"] || "",
        watchersCount: item["watchers_count"] || "",
      }))
    );
  }, [repositoryJsonList]);

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
          <TableView repositories={repositories} />
        ) : (
          <CardView repositories={repositories} />
        )}
      </div>
    </div>
  );
};

export default RepoPage;
