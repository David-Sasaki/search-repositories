import React, { useEffect, useState } from "react";
import fetchRepositories from "../../services/api";
import getFieldsFromJsonList from "../../utils/jsonParser";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import Repository from "../../utils/types";

const CardView: React.FC<{ query: string }> = ({ query }) => {
  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(0);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const renderPage = () => {
    if (query.length > 0) {
      fetchRepositories(
        query,
        page,
        Number(process.env.REACT_APP_PAGE_SIZE_FOR_CARD_VIEW)
      )
        .then((data) => {
          setRepositories((prev) => [
            ...prev,
            ...getFieldsFromJsonList(data?.items || []),
          ]);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          setRepositories([]);
        });
    }
  };

  useEffect(() => {
    setPage(0);
    setRepositories([]);
  }, [query]);

  useEffect(() => {
    if (page > 0) renderPage();
  }, [page]);

  useEffect(() => {
    if (repositories.length === 0) renderPage();
  }, [repositories]);

  useEffect(() => {
    if (isBottom) setPage((prev) => prev + 1);
  }, [isBottom]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop + (document.documentElement.scrollTop || 0);

      if (windowHeight + scrollTop >= documentHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {repositories.map((repo, index) => (
        <RepositoryCard key={index} repository={repo} />
      ))}
    </div>
  );
};

export default CardView;
