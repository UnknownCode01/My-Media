import React, { Component } from "react";
import { FaMoon, FaSun } from 'react-icons/fa';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    // Check localStorage for saved dark mode preference or default to false
    const savedMode = localStorage.getItem('darkMode') === 'enabled';
    this.state = {
      isDarkMode: savedMode,
    };
  }
  toggleDarkMode = (mode) => {
    this.setState({ isDarkMode: mode }, () => {
      // Save preference in localStorage
      localStorage.setItem('darkMode', mode ? 'enabled' : 'disabled');
      // Apply dark mode class to body
      if (mode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  };
  render() {
    return (
      <div>
        <nav className={`navbar navbar-expand-lg ${this.state.isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              My Media
            </a>
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Head Lines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Business
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tech
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Near Me
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        My City
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        My State
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        My Country
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="me-4 mb-2 mb-lg-0">
                <button className="button btn btn-outline-secondary me-2" type="submit"  onClick={() => this.toggleDarkMode(false)}>
                <FaSun /> Light
                </button>
                <button className="button btn btn-outline-secondary" type="submit"  onClick={() => this.toggleDarkMode(true)}>
                <FaMoon /> Dark
                </button>
              </div>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className=" btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavBar;
