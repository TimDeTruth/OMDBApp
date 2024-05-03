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
      setMovies(searchResults || []);
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for movies"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        style={styles.movieList}
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        keyExtractor={(item) => item.imdbID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },

  movieList: {
    width: "175%",
  },
});

export default SearchBar;
