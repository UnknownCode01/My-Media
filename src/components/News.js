import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const News = ({ pageSize, q }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultImage = "/news.jpeg";
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(100);
  const { searchItem } = useParams(); // Get searchItem from the URL params
  const apiKey = process.env.REACT_APP_API_KEY;

  const updateNews = async (query) => {
    console.log(searchItem);
    
    let url = `https://newsapi.org/v2/everything?q=${searchItem || query}&apiKey=${apiKey}&sortBy=date&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    updateNews(q);
  }, [q, searchItem, pageSize, page]);

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">{q==="searchItem"?searchItem:q}</h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => {
            if (element.title == null || element.title === "[Removed]") return null;
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 60) : null}
                  description={element.description ? element.description.slice(0, 80) : null}
                  imageUrl={element.urlToImage ? element.urlToImage : defaultImage}
                  newsUrl={element.url}
                  author={element.author || "unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          className="button btn btn-outline-secondary"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          className="button btn btn-info"
        >
          Page: {page}
        </button>
        <button
          type="button"
          disabled={page >= Math.floor(100 / pageSize) || page >= Math.ceil(totalResults / pageSize)}
          className="button btn btn-outline-secondary"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};


export default News;
