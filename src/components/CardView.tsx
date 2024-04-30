import React, { useEffect, useState } from "react";
import RepositoryCard from "./RepositoryCard";
import "../assets/styles/CardView.css";

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

interface CardViewProps {
  repositories: Repository[];
}

const CardView: React.FC<CardViewProps> = ({ repositories }) => {
  const [repositoryList, setRepositoryList] =
    useState<Repository[]>(repositories);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });

    observer.observe(document.querySelector("#load-more")!);
    return () => observer.disconnect();
  }, [hasMore]);

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setRepositoryList((prev) => [...prev, ...prev.slice(0, 20)]); // Duplicate the data for demonstration
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {repositoryList.map((repo, index) => (
        <RepositoryCard key={index} repository={repo} />
      ))}
      {loading && <p>Loading more...</p>}
      <div id="load-more"></div>
    </div>
  );
};

export default CardView;
