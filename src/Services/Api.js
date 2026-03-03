const API_KEY = "9c917aae"; 
const BASE_URL = "http://www.omdbapi.com/";


export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching movies: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.Search || []; 
  } catch (error) {
    console.error("API Error (searchMovies):", error);
    throw error;
  }
};

export const getDefaultMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=marvel`);
    if (!response.ok) {
      throw new Error(
        `Error fetching default movies: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("API Error (getDefaultMovies):", error);
    throw error;
  }
};


export const getMovieDetails = async (id) => {
  try {
    
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`,
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching details: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    if (data.Response === "True") {
      return data; 
    } else {
      throw new Error(data.Error || "Failed to fetch movie details.");
    }
  } catch (error) {
    console.error("API Error (getMovieDetails):", error);
    throw error;
  }
};
