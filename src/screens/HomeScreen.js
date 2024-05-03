import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
  return (
    <View>
      <View>
        <Image
          source={require("../../assets/ensemble-logo.jpeg")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.searchTile}>OMDB Movie Search</Text>

      <SearchBar style={styles.searchBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchTile: {
    fontWeight: "bold",
    fontStyle: "italic",
    justifyContent: "center",
    alignContent: "center",
  },

  logo: {
    marginTop: "20%",
    width: "100%",
    height: 75,
    resizeMode: "cover",
  },
});

export default HomeScreen;
