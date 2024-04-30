import { useEffect, useState } from "react";
import fetchRepositories from "../services/api";
import getFieldsFromJsonList from "../utils/jsonParser";
import Repository from "../types/types-index";

export function useFetchRepos(query: string, page: number, pageSize: number) {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      fetchRepositories(query, page, pageSize)
        .then((data) => {
          setRepos(getFieldsFromJsonList(data?.items || []));
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          setRepos([]);
        });
    }
  }, [query, page, pageSize]);

  return repos;
}
