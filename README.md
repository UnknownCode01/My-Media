# My Media

My Media is a React-based web application designed to fetch and display the latest news from a public API. The app allows users to view trending news articles in real time, with options to filter by various categories like Head Lines, Science, Business, Tech, Politics, Entertainment and Sports.

## Features

- Fetches real-time news articles from a public API.
- Displays news articles in a clean and intuitive layout.
- Allows users to filter news by category (e.g., Technology, Sports, Business).
- Responsive design for seamless experience on all devices.
- Displays Near by location news on selection using advanced aggressive upload method.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the application and ensuring responsiveness.
- **React Router**: For managing navigation and routing in the app.
- **News API**: Public API for fetching the latest news articles.

## Prerequisites

- **Node.js** (v14 or above) and **npm** must be installed on your machine.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/UnknownCode01/My-Media.git
```

### 2. Navigate to the Project Directory

```bash
cd My-Media
```

### 3. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm i
```

## Running the Application

Once the dependencies are installed, you can run the application in development mode.

### 1. Start the Development Server

```bash
npm start
```

### 2. Open the Application

After the server has started, open your browser and go to:

```
http://localhost:3000
```

You should now see the "My Media" app running on your local machine, displaying the latest news articles.

## Usage

- On the homepage, you'll see the latest news articles fetched from the API.
- Use the filters to change the news category (e.g., Technology, Business, Sports).
- Each article has a link that will take you to the full article.

## API Key

- To use the news API, you'll need an API key.
- Visit [News API](https://newsapi.org/) to obtain your API key.
- Once you have the key, add it to the `.env.local` file in the project root:

  ```
  REACT_APP_NEWS_API_KEY=your-api-key-here
  ```

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request.


I hope this suits your needs, sir/madam. Should you require any further modifications or additions, please do let me know.