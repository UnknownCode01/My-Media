import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const News = ({ pageSize, q }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImage = "/news.jpeg";
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(100);
  const { searchItem } = useParams(); // Get searchItem from the URL params
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log("articles",articles);
  
  const updateNews = async (query) => {
    console.log("api");
    let url = `https://newsapi.org/v2/everything?q=${
      searchItem || query
    }&apiKey=${apiKey}&sortBy=date&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    let x = [...articles,...parsedData.articles];
    await sleep(1000);
    setArticles(x);
    //  learn from this code why it didn't work, it ruined my 20 hrs only this part
    // setArticles((prev) => {
    //   console.log("prev", prev);
    //   console.log("new", parsedData.articles);
    //   console.log("again");
    //   if (parsedData.articles.length === 0) {
    //     return prev; // No change if no articles found
    //   }
    //   return [...prev, ...parsedData.articles];
    // });
    // console.log(articles.length);

    settotalResults(parsedData.totalResults);
    setLoading(false);
  };

  const handelInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        console.log("inside");
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateNews(q);
  }, [q, searchItem, page]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    console.log("called");

    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);


  return (
    <div className="container my-3">
      <h2 className="text-center">{q === "searchItem" ? searchItem : q}</h2>
      <div className="row">
        {articles.map((element) => {
          if (element.title == null || element.title === "[Removed]")
            return null;
          return (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 60) : null}
                description={
                  element.description ? element.description.slice(0, 80) : null
                }
                imageUrl={
                  element.urlToImage ? element.urlToImage : defaultImage
                }
                newsUrl={element.url}
                author={element.author || "unknown"}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          );
        })}
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default News;
