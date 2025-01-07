import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const loadingBarRef = useRef(null);
  return (
    <div>
      <Router>
        {/* LoadingBar with ref */}
        <LoadingBar color="#FF2929" ref={loadingBarRef} height={2.5} />
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<News key="general" pageSize={pageSize} q="general" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/headlines"
            element={<News key="headlines" pageSize={pageSize} q="headlines" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/science"
            element={<News key="science" pageSize={pageSize} q="science" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/business"
            element={<News key="business" pageSize={pageSize} q="business" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/tech"
            element={<News key="tech" pageSize={pageSize} q="tech" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/politics"
            element={<News key="politics" pageSize={pageSize} q="politics" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/entertainment"
            element={
              <News key="entertainment" pageSize={pageSize} q="entertainment" loadingBarRef={loadingBarRef} />
            }
          />
          <Route
            path="/sports"
            element={<News key="sports" pageSize={pageSize} q="sports" loadingBarRef={loadingBarRef} />}
          />
          <Route
            path="/search/:searchItem"
            element={<News key="search" pageSize={pageSize} q="searchItem" loadingBarRef={loadingBarRef} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
