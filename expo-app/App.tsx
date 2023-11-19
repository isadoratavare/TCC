import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "./src/components/Map";

import SearchBar from "./src/components/SearchBar";

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: " 100%",
  },
});

