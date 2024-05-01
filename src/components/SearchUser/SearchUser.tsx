import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import "./SearchUser.css";

interface User {
  avatar_url: string;
  name: string;
  email: string | null;
}

const SearchUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(data);
    } catch (error: any) {
      setError("Failed to fetch user");
      setUser(null);
    }
  };

  const handleInputChange = (value: string) => {
    setUsername(value);
  };

  return (
    <div className="search-user">
      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e.target.value)
        }
      />
      <button onClick={handleSearch}>Search</button>
      {user && (
        <div className="user-info">
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{ width: "100px" }}
          />
          <p>Name: {user.name}</p>
          <p>Email: {user.email || "No public email"}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchUser;
