import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchMovies } from "../services/omdbService";

export const useMovieSearch = (searchTerm) => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const search = async () => {
      const trimmedSearchTerm = searchTerm.trim();

      // Exit early if the trimmed search term is empty
      if (!trimmedSearchTerm) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      try {
        // Check if movie results are cached in AsyncStorage
        const cachedMovieResult = await AsyncStorage.getItem(trimmedSearchTerm);
        // If cached results are found, retrieve them
        if (cachedMovieResult) {
          setErrorMessage("");
          const retrievedMovies = JSON.parse(cachedMovieResult);
          setMovies(retrievedMovies);
        } else {
          // Otherwise, searchMovies API call
          const searchForResults = await searchMovies(trimmedSearchTerm);
          // If no movies are found, set an error message
          if (searchForResults.length === 0) {
            setErrorMessage("No movies found");
            return;
          }
          // Cache the search results in AsyncStorage and update the movie list
          await AsyncStorage.setItem(
            trimmedSearchTerm,
            JSON.stringify(searchForResults)
          );
          setErrorMessage("");
          setMovies(searchForResults);
        }
      } catch (err) {
        console.log(err);
      }
    };
    search();
  }, [searchTerm]);

  return { movies, errorMessage };
};
