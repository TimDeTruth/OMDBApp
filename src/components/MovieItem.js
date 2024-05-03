import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const MovieItem = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
        <CustomButton
          title="Details"
          onPress={() => {}}
          style={styles.customButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  poster: {
    flex: 1,
    width: 150,
    height: 150,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  year: {
    fontSize: 11,
    marginBottom: 5,
  },
  button: {
    width: 80,
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 11,
    color: "white",
  },
  customButton: {
    width: 60,
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MovieItem;
