import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Apply dark mode when component mounts
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  }, [isDarkMode]);

  const toggleDarkMode = (mode) => {
    setIsDarkMode(mode);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/search/${search}`);
    setSearch(""); 
  };

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Media
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/headlines"
                >
                  Head Lines
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tech">
                  Tech
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="politics">
                  Politics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              {/* Drop-Down */}
              {/* {<li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="/dropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Near Me
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/myCity">
                      My City
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myState">
                      My State
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myCountry">
                      My Country
                    </Link>
                  </li>
                </ul>
              </li>} */}
            </ul>
            <div className="d-flex me-4 mb-2 mb-lg-0">
              <button
                className="button btn btn-outline-secondary me-2"
                onClick={() => toggleDarkMode(false)}
              >
                <FaSun /> Light
              </button>
              <button
                className="button btn btn-outline-secondary"
                onClick={() => toggleDarkMode(true)}
              >
                <FaMoon /> Dark
              </button>
            </div>
            {/* Search */}
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <Link className="btn btn-success" to={`/search/${search}`} onClick={handleSearchClick}>
                Search
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
