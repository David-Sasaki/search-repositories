import React, { useEffect, useState } from "react";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import { useFetchRepos } from "../../hooks/useFetchRepos";

const CardView: React.FC<{ query: string }> = ({ query }) => {
  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(0);
  const { repos, error } = useFetchRepos(
    query,
    page,
    Number(process.env.REACT_APP_PAGE_SIZE_FOR_CARD_VIEW)
  );

  useEffect(() => {
    setPage(0);
  }, [query]);

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

  useEffect(() => {
    if (error.length > 0) {
      window.alert(`Fetching error: ${error}`);
    }
  }, [error]);

  return (
    <div>
      {repos.map((repo) => (
        <RepositoryCard key={repo.name} repository={repo} />
      ))}
    </div>
  );
};

export default CardView;
