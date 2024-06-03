import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = () => {
  return (
    <View>
      <Image
        source={require("../../assets/ensemble-logo.jpeg")}
        style={styles.logo}
      />
      <Text style={styles.searchTile}>OMDB Movie Search</Text>
      <SearchBar style={styles.searchBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: "15%",
    width: SCREEN_WIDTH * 0.8,
    height: 75,
    resizeMode: "cover",
  },
  searchTile: {
    fontWeight: "bold",
    fontStyle: "italic",
    alignSelf: "center",
  },
});

export default HomeScreen;
