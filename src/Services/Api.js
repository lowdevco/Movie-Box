const OMDB_API = "9c917aae";
const BASE_URL = "https://www.omdbapi.com/";

export const getDefaultMovies = async () => {
  const response = await fetch(`${BASE_URL}?apikey=${OMDB_API}&s=Avengers`);
  const data = await response.json();
  return data.Search || [];
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${OMDB_API}&s=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.Search || [];
};
