import React, { useState, useEffect, useRef } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const capitalizeFirstLetter = (val) =>
  val.charAt(0).toUpperCase() + val.slice(1);

const News = ({ pageSize, q, loadingBarRef }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingState, setLoadingState] = useState(false);
  const [SearchNo, setSearchNo] = useState(false);
  const { searchItem } = useParams();
  const loadingRef = useRef(false); // Use ref to track loading state
  const apiKey = process.env.REACT_APP_API_KEY;
  const defaultImage = "/news.jpeg";
  const stopImage = "/stop1.jpg";
  // console.log(articles);

  const updateNews = async () => {
    loadingRef.current = true; // Start loading
    setLoadingState(true); // Show spinner
    loadingBarRef.current.continuousStart(); // Show loading bar
    document.title = capitalizeFirstLetter(`${searchItem || q} - My Media`);

    let url = `https://newsapi.org/v2/everything?q=${
      searchItem || q
    }&apiKey=${apiKey}&sortBy=date&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    await sleep(1000);
    
    setArticles((prevArticles) => {
      if (page === 1) {
        return parsedData.articles;
      }
      return [...prevArticles, ...parsedData.articles];
    });

    loadingRef.current = false; // End loading
    setLoadingState(false); // Hide spinner
    loadingBarRef.current.complete(); // Complete loading bar
  };

  const handelInfiniteScroll = () => {
    try {
      // Only trigger the page increment if it's not already loading
      if (loadingRef.current) return; // Check the loading state using ref

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // console.log(page);
        setPage((prev) => prev + 1); // Increment page number
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handles the query and new page fetch
  useEffect(() => {
    if (page < Math.floor(100 / pageSize)) {
      updateNews();
    } else if (page == Math.floor(100 / pageSize)) {
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
        publishedAt: "January 01, 1969 17:54:48",
      };
      setArticles((prev) => [...prev, x]);
    }
  }, [q, SearchNo, page]);

  // Reset articles and page when searchItem changes
  useEffect(() => {
    setArticles([]); // Reset articles
    if (page > 1) {
      setPage(1); // Reset page to 1
    } else {
      setSearchNo(!SearchNo);   //For not choosing to set searchItem in both the use effect this variable helps when page = 1 and you are searching after one or more search
    }
  }, [searchItem]); // Triggered when searchItem changes

  //For handling scrolls
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div className="container my-3">
      <h2 className="text-center">{capitalizeFirstLetter(searchItem || q)}</h2>
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
      {loadingRef.current && <Spinner />}
    </div>
  );
};

export default News;
