import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export class News extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  static defaultProps = {
    q: "general",
    pageSize: 6,
  };
  static propTypes = {
    q: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      defaultImage:
        "https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      page: 1,
    };
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => {
      console.log(`prev${this.state.page}`);
      this.updateNews();
    });
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => {
      console.log(`next${this.state.page}`);
      this.updateNews();
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              if (element.title == null || element.title === "[Removed]") {
                return null; // Skip this iteration if there's no title
              } else {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title == null
                          ? null
                          : element.title.slice(0, 60)
                      }
                      description={
                        element.description == null
                          ? null
                          : element.description.slice(0, 80)
                      }
                      imageUrl={
                        element.urlToImage == null
                          ? this.state.defaultImage
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={element.author || "unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            class="button btn btn-outline-secondary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page >= Math.floor(100 / this.props.pageSize)}
            class="button btn btn-outline-secondary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
