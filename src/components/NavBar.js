import React, { Component } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import News from './News';
export class NavBar extends Component {
  constructor(props) {
    super(props);
    // Check localStorage for saved dark mode preference or default to false
    const savedMode = localStorage.getItem("darkMode") === "enabled";
    this.state = {
      isDarkMode: savedMode,
      search: "", // Local search state
    };
  }
  componentDidMount() {
    // Apply dark mode class to body when the component mounts
    this.toggleDarkMode(this.state.isDarkMode);
  }
  toggleDarkMode = (mode) => {
    this.setState({ isDarkMode: mode }, () => {
      // Save preference in localStorage
      localStorage.setItem("darkMode", mode ? "enabled" : "disabled");
      // Apply dark mode class to body
      if (mode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
  };
  // Handle search input change
  handleSearchChange = (e) => {
    const value = e.target.value;  // Get the value from the input field
    this.setState({ search: value });  // Update the local state
    // if (this.props.updateSearchQuery) {
    //   this.props.updateSearchQuery(value);
    // }
    console.log(e.target.value);
  };

  // Handle search submit
  // handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.updateSearchQuery(this.state.search); // Pass search value to App.js
  //   console.log(this.state.search);
  // };
  render() {
    let handleSearch=()=>{
      console.log("h");
      <News key="search" pageSize={this.state.pageSize} q={this.state.search} />
    }
    return (
      <div>
        <nav
          className={`navbar navbar-expand-lg ${
            this.state.isDarkMode
              ? "navbar-dark bg-dark"
              : "navbar-light bg-light"
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
                {/* <li className="nav-item dropdown">
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
                </li> */}
              </ul>
              <div className="me-4 mb-2 mb-lg-0">
                <button
                  className="button btn btn-outline-secondary me-2"
                  type="submit"
                  onClick={() => this.toggleDarkMode(false)}
                >
                  <FaSun /> Light
                </button>
                <button
                  className="button btn btn-outline-secondary"
                  type="submit"
                  onClick={() => this.toggleDarkMode(true)}
                >
                  <FaMoon /> Dark
                </button>
              </div>
              <div
                className="d-flex"
                role="search"
                onSubmit={this.handleSearchSubmit}
              >
                {/* <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                /> */}
                {/* <Link className="nav-link" to="/search">su
                </Link> */}
                {/* <button onClick={handleSearch} className=" btn btn-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>
          </div>
        </nav>
        {/* {this.state.search && <News key="search" pageSize={this.state.pageSize} q={this.state.search} />} */}
      </div>
    );
  }
}
export default NavBar;
