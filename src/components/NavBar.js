import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const locationApiKey = process.env.REACT_APP_LOCATION_API_KEY;
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Trigger the search when Enter is pressed
      event.preventDefault(); // Prevent default behavior (if necessary)
      handleSearchClick(); // Call the search function
    }
  };

  const gotLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${locationApiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const address = data.results[0].components;
      setCity(address.city);
      setDistrict(address.state_district);
      setState(address.state);
      setCountry(address.country);
      console.log(city);
      
    } catch (error) {
      console.log(error);
    }
    
  };

  const errorLocation = () => {
    console.log("Error at Location");
  };

  const nearMe = () => {
    navigator.geolocation.getCurrentPosition(gotLocation, errorLocation);
  };

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-dark"
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
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/dropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={nearMe}
                >
                  Near Me
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/myCity/${city}`}>
                      My City
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/myDistrict/${district}`}>
                      My District
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/myState/${state}`}>
                      My State
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/myCountry/${country}`}>
                      My Country
                    </Link>
                  </li>
                </ul>
              </li>
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
                className="form-control me-2 input-button"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <Link
                className="btn search-buton btn-success"
                to={`/search/${search}`}
                onClick={handleSearchClick}
              >
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
