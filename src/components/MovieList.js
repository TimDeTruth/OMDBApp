import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }) => {
  return (
    <FlatList
      style={styles.movieList}
      data={movies}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => <MovieItem movie={item} />}
    />
  );
};

const styles = StyleSheet.create({
  movieList: {
    width: 250,
    marginBottom: 16,
  },
});

export default MovieList;
