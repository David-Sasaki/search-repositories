import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => <h1>Home Page</h1>;
const Repo = () => <h1>Repo Page</h1>;
const Setting = () => <h1>Setting Page</h1>;

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/repo">Repo</Link>
          <Link to="/setting">Setting</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo" element={<Repo />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
