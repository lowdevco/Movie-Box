# 🎬 MovieBox

MovieBox is a modern, responsive React application that allows users to search for movies, view detailed information, and save their favorite cinematic picks. Built with a sleek, glassmorphic UI, it delivers a premium user experience while interacting with a live movie database.

## ✨ Features

* **Live Search:** Instantly search for movies, series, and episodes using the OMDb API.
* **Detailed Views:** Click on any movie card to view a comprehensive breakdown including synopsis, cast, crew, runtime, and ratings.
* **Favorites System:** Save movies to your personal favorites list. Data is persisted using `localStorage` so you never lose your picks.
* **Modern UI/UX:** Features a beautiful dark-mode interface with glassmorphism, smooth CSS transitions, and an edge-to-edge responsive grid layout.
* **Smart Error Handling:** Automatically filters out missing posters and provides clean fallback UI for broken links or empty search results.

## 🛠️ Tech Stack

* **Frontend:** React (v19)
* **Routing:** React Router DOM (v7)
* **Build Tool:** Vite
* **Styling:** Pure CSS3 (Flexbox, Grid, Backdrop-filter)
* **API:** [OMDb API](http://www.omdbapi.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* An API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/movie-box.git](https://github.com/yourusername/movie-box.git)
    cd movie-box
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    * Open `src/Services/Api.js`
    * Replace the `API_KEY` variable with your own OMDb API key.
    ```javascript
    const API_KEY = "your_api_key_here";
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173] to view it in the browser.

## 🌐 Deployment

This project is optimized for deployment on platforms like Netlify, Vercel, or Render. 

*Note for Netlify users:* Ensure you have a `_redirects` file in your `public` directory containing `/* /index.html 200` to properly handle React Router navigation.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/movie-box/issues).

