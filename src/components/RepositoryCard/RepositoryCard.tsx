import React from "react";
import "./RepositoryCard.css";

const RepositoryCard: React.FC<{ repository: any }> = ({ repository }) => {
  return (
    <div className="repository-card">
      <h2>{repository.name}</h2>
      <p>{repository.description}</p>
      <div className="details">
        <span>Language: {repository.language}</span>
        <span>Stars: {repository.watchersCount}</span>
      </div>
      <a href={repository.url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default RepositoryCard;
