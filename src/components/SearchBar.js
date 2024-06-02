import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet, Text } from "react-native";
import MovieList from "./MovieList";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { searchMovies } from "../services/omdbService";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  /*   useEffect(() => {
    const search = async () => {
      try {
        const cachedMovieResult = await AsyncStorage.getItem(searchTerm);
        console.log("i found in AS: ", searchTerm);
        // console.log("movie list:", movies)
        if (cachedMovieResult) {
          setMovies((prevMovies) => JSON.parse(cachedMovieResult));
        } else {
          if (searchTerm.trim().length > 0) {
            const searchForResults = await searchMovies(searchTerm);
            if (searchForResults.length === 0) {
              setErrorMessage("No movies found");
            } else {
              await AsyncStorage.setItem(
                searchTerm,
                JSON.stringify(searchForResults)
              );
              setMovies(searchForResults);
              setErrorMessage("");
            }
          } else {
            setMovies([]); // Clear movies if search term is empty
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    search();
  }, [searchTerm]); // Run effect whenever searchTerm changes */

  useEffect(() => {
    const search = async () => {
      try {
        //check in AsyncStorage first for the search term
        const cachedMovieResult = await AsyncStorage.getItem(searchTerm);
        // console.log("i found in AS: ", cachedMovieResult);
        // console.log("movie list: ", movies);

        //if i found the key in AS
        if (cachedMovieResult) {
          // setMovies(cachedMovieResult);
          console.log("i got from AS and there is a key: ", searchTerm);
          const retrievedMovies = JSON.parse(cachedMovieResult);
          // console.log(retrievedMovies);
          setErrorMessage("");
          console.log("the error message curr: ", errorMessage);
          setMovies(retrievedMovies);
          // console.log(movies);
        } else {
          const searchForResults = await searchMovies(searchTerm);
          if (searchForResults.length === 0) {
            setErrorMessage("No movies found");
            return;
          }
          //i have movie results so im going to store it in AS
          else {
            await AsyncStorage.setItem(
              searchTerm,
              JSON.stringify(searchForResults)
            );
            setErrorMessage("");
            setMovies(searchForResults);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    search();

    /*     // Deal with whitespace
    if (searchTerm.trim().length > 0) {
      search();
    } else {
      setMovies(null);
    } */
  }, [searchTerm]);

  /*   useEffect(() => {
    const search = async () => {
      const searchResults = await searchMovies(searchTerm);
      // console.log(searchResults.length);

      //means no results,
      if (searchResults.length === 0) {
        setErrorMessage("No movies found");
      } else {
        setMovies(searchResults);
        setErrorMessage("");
      }
    };
    //deal with whitespace
    if (searchTerm.trim().length > 0) {
      search();
    } else {
      setMovies([]);
    }
  }, [searchTerm]); */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="characters"
        autoCorrect={true}
      />

      {errorMessage && searchTerm.length > 0 ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <MovieList movies={movies} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginBottom: 8,
  },

  errorMessage: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});

export default SearchBar;
