import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
const OMDB_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

//Axios instance with rate limit
const axiosApiCall = axiosRateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
});

const searchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );
    const { status, data } = response;

    if (status === 200) {
      if (data.Response === "True") {
        return data.Search;
      } else {
        console.log(`No movies found for search term: ${searchTerm}`);
      }
    } else {
      console.log(`Failed to fetch movies: HTTP status ${status}`);
    }
  } catch (error) {
    console.log(`An error occurred while fetching movies: ${error.message}`);
  }
  return [];
};
export { searchMovies };
