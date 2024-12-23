import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        setCategories([]);
        console.log("Error in fetching categories");
      } else {
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>Categories</Text>
      {categories.length > 0 ? (
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryTitle}>
                {item.name || item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator
          style={{ marginTop: 10, marginBottom: 20 }}
          size="large"
          color="#ed7014"
        />
      )}
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryCard: {
    width: 150,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  categoryImage: {
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
