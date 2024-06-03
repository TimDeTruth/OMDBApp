import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import MovieList from "./MovieList";
import { useMovieSearch } from "../hooks/useMovieSearch";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, errorMessage } = useMovieSearch(searchTerm);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        value={searchTerm}
        onChangeText={setSearchTerm}
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
