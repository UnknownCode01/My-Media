import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
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
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/everything?q=india&apiKey=${this.apiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  handlePrevClick = async () => {
    console.log(`prev${this.state.page}`);
    let url =
      `https://newsapi.org/v2/everything?q=india&apiKey=${this.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles
    })
  };

  handleNextClick = async () => {
    console.log(`next${this.state.page}`);
    let url =
      `https://newsapi.org/v2/everything?q=india&apiKey=${this.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles
    })
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            if (element.title==null || element.title==="[Removed]") {
               return null;// Skip this iteration if there's no title
            }else{
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title == null ? null : element.title.slice(0, 60)
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
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page<=1}
            class="button btn btn-outline-secondary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page>=5}
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
