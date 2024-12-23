import { StyleSheet, ScrollView } from "react-native";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FeaturedContent from "@/components/FeaturedContent";
import Categories from "@/components/Categories";
import ItemsOnSale from "@/components/ItemsOnSale";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <FeaturedContent />
      <Categories />
      <ItemsOnSale />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default Home;
