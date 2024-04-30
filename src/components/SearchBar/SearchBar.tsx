import React, { ChangeEvent } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Input key here ..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onQueryChange(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBar;
