import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import MovieItem from "./MovieItem";
import { searchMovies } from "../services/omdbService";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const search = async () => {
      const searchResults = await searchMovies(searchTerm);
      setMovies(searchResults);
    };

    //deal with whitespace
    if (searchTerm.trim().length > 0) {
      search();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

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

      <FlatList
        style={styles.movieList}
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieItem movie={item} />}
      />
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

  movieList: {
    width: 250,
    marginBottom: 16,
  },
});

export default SearchBar;
