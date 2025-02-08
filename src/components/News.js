import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const capitalizeFirstLetter = (val) =>
  val.charAt(0).toUpperCase() + val.slice(1);

const News = ({ pageSize, q, loadingBarRef }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [SearchNo, setSearchNo] = useState(false);
  const { searchItem } = useParams();
  const [loadingState, setLoadingState] = useState(false);
  const loadingRef = useRef(false); // Use ref to track loading state
  const apiKey = process.env.REACT_APP_API_KEY;
  const defaultImage = "/news.jpeg";
  const stopImage = "/stop.jpg";
  const errorImage = "/error.jpg";
  const [error, setError] = useState(false);
  const [totalResults, settotalResults] = useState(100);
  const [newsCount, setnewsCount] = useState(0);
  // console.log(articles);

  const updateNews = useCallback(async () => {
    loadingRef.current = true; // Start loading
    setLoadingState(true); // Show spinner
    loadingBarRef.current.continuousStart(); // Show loading bar
    document.title = capitalizeFirstLetter(`${searchItem || q} - My Media`);

    let url = `https://newsapi.org/v2/everything?q=${
      searchItem || q
    }&apiKey=${apiKey}&sortBy=date&page=${page}&pageSize=${pageSize}`;
    try {
      // console.log("Trying")
      let data = await fetch(url);
      if (!data.ok) {  // Check if response is not OK
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      let parsedData = await data.json();
      settotalResults(parsedData.totalResults);
      await sleep(1000);

      setArticles((prevArticles) => {
        if (page === 1) {
          return parsedData.articles;
        }
        return [...prevArticles, ...parsedData.articles];
      });
    } catch (error) {
      // console.error("Failed to fetch news:", error);
      setError(true);
      let data = {
        "status": "ok",
        "totalResults": 1,
        "articles": [
          {
            "source": {
              "id": null,
              "name": "My Media"
            },
            "author": "My Media Team",
            "title": "Error",
            "description": "An error Occured with API",
            "url": "",
            "urlToImage": errorImage,
            "publishedAt": null,
            "content": ""
          }
        ]
      }
      setArticles(data.articles)
    } finally {
      loadingRef.current = false; // End loading
      setLoadingState(false); // Hide spinner
      loadingBarRef.current.complete(); // Complete loading bar
    }
  }, [searchItem, q, page, pageSize]);

  const handelInfiniteScroll = () => {
      // Only trigger the page increment if it's not already loading
      if (loadingRef.current) return; // Check the loading state using ref

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // console.log(page);
        setPage((prev) => prev + 1); // Increment page number
        setnewsCount(page*6);
      }
  };

  //Handles the query and new page fetch
  useEffect(() => {
    if (page < Math.floor(100 / pageSize) && newsCount<totalResults) {
      updateNews();
    } else {
      const x = {
        source: {
          id: null,
          name: "My Media",
        },
        author: "My Media Team",
        title: "Excessive Consumption of News is Detrimental to the Mind",
        description:
          "Consuming more can lead to mental discomfort, take a break",
        url: "",
        urlToImage: stopImage,
        publishedAt: null,
      };
      setArticles((prev) => [...prev, x]);
    }
  }, [q, SearchNo, page, updateNews]);

  // Reset articles and page when searchItem changes
  useEffect(() => {
    setArticles([]); // Reset articles
    if (page > 1) {
      setPage(1); // Reset page to 1
    } else {
      setSearchNo(!SearchNo); //For not choosing to set searchItem in both the use effect this variable helps when page = 1 and you are searching after one or more search
    }
  }, [searchItem]); // Triggered when searchItem changes

  //For handling scrolls
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
    <div className="container my-3">
      <h2 className="text-center">{error?"Error":capitalizeFirstLetter(searchItem || q)}</h2>
      <div className={`row ${error ? 'justify-content-center' : ''}`}>
        {articles.map((element) => {
          if (element.title === null || element.title === "[Removed]")
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
      {loadingRef.current && <Spinner />}
    </div>
    </>
  );
};

export default News;
