import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
const OMDB_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const axiosApiCall = axiosRateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
});

/* axiosApiCall.interceptors.request.use((request) => {
  console.log(`Requesting: ${request.url} at ${new Date().toISOString()}`);
  return request;
}); */

const searchMovies = async (searchTerm) => {
  try {
    const response = await axiosApiCall.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );
    // console.log("The response", response.data.Response);

    if (response.status === 200) {
      if (response.data.Response === "True") {
        return response.data.Search;
      } else {
        throw new Error("No movies found");
      }
    } else {
      throw new Error("Failed to fetch movies");
    }
  } catch (error) {
    // console.error("Error searching movies:", error);
    return [];
  }
};
export { searchMovies };

//fetch
/* const searchMovies = async (searchTerm) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );
    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      return data.Search;
    } else {
      throw new Error("Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}; */
