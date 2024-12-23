import { StyleSheet, TextInput } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.searchBar}
      />
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
