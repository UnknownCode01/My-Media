import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state = {
    searchQuery: "general", // Default search query
    pageSize: 6,
  };

  // Function to update search query
  // updateSearchQuery = async (query) => {
  //   await this.setState({ searchQuery: query });
  //   console.log("->",this.state.searchQuery);
  // };
  render() {
    return (
      <div>
        <Router>
        {/* <NavBar updateSearchQuery={this.updateSearchQuery} /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<News key="general" pageSize={this.state.pageSize} q="general"/>}></Route>
          <Route path="/headlines" element={<News key="headlines" pageSize={this.state.pageSize} q="headlines"/>}></Route>
          <Route path="/science" element={<News key="science" pageSize={this.state.pageSize} q="science"/>}></Route>
          <Route path="/business" element={<News key="business" pageSize={this.state.pageSize} q="business"/>}></Route>
          <Route path="/tech" element={<News key="tech" pageSize={this.state.pageSize} q="tech"/>}></Route>
          <Route path="/politics" element={<News key="politics" pageSize={this.state.pageSize} q="politics"/>}></Route>
          <Route path="/entertainment" element={<News key="entertainment" pageSize={this.state.pageSize} q="entertainment"/>}></Route>
          <Route path="/sports" element={<News key="sports" pageSize={this.state.pageSize} q="sports"/>}></Route>
          {/* <Route path="/search" element={<News key="search" pageSize={this.state.pageSize} q={this.state.searchQuery}/>}></Route> */}
          
        </Routes>
        </Router>
      </div>
    )
  }
}
