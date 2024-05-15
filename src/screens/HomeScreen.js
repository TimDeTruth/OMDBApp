import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";

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
    marginTop: "8%",
    width: "auto",
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
