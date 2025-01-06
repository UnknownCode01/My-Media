import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {y
  const pageSize = 6;
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<News key="general" pageSize={pageSize} q="general" />} />
          <Route path="/headlines" element={<News key="headlines" pageSize={pageSize} q="headlines" />} />
          <Route path="/science" element={<News key="science" pageSize={pageSize} q="science" />} />
          <Route path="/business" element={<News key="business" pageSize={pageSize} q="business" />} />
          <Route path="/tech" element={<News key="tech" pageSize={pageSize} q="tech" />} />
          <Route path="/politics" element={<News key="politics" pageSize={pageSize} q="politics" />} />
          <Route path="/entertainment" element={<News key="entertainment" pageSize={pageSize} q="entertainment" />} />
          <Route path="/sports" element={<News key="sports" pageSize={pageSize} q="sports" />} />
          <Route path="/search/:searchItem" element={<News key="search" pageSize={pageSize} q="searchItem" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
