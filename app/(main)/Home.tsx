import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/hooks/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, useRouter } from "expo-router";


const Home = () => {
  const { setAuth } = useAuth();
  const router = useRouter(); // Initialize the router


  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign Out", "Error Signing Out!");
    }
  };

  const screenWidth = Dimensions.get("window").width;

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [saleData, setSaleData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const { data: SaleItems, error } = await supabase
        .from("SaleItems")
        .select("*");

      if (error) {
        setSaleData([]);
        console.log("Error in fetching sales data");
      } else {
        setSaleData(SaleItems);
        setError(null);
        console.log(SaleItems);
      }
    };

    const fetchFeaturedData = async () => {
      const { data: FeaturedContent, error } = await supabase
        .from("FeaturedContent")
        .select("*");

      if (error) {
        setFeaturedData([]);
        console.log("Error in fetching featured data");
      } else {
        setFeaturedData(FeaturedContent);
        setError(null);
      }
    };

    const fetchCategories = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        setData([]);
        console.log("Error in fetching categories");
      } else {
        setData(categories);
        setError(null);
      }
    };

    fetchCategories();
    fetchFeaturedData();
    fetchSalesData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hello</Text>
          <Text style={styles.userName}>Mukaram Awan</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.searchBar}
      />
      {/* ScrollView for Featured Content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.featuredContainer}
      >
        {featuredData.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.images }}
            style={[styles.featuredImage, { width: screenWidth - 40 }]}
          />
        ))}
      </ScrollView>
      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
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
      {/* Items on Sale Section */}
      <Text style={styles.sectionTitle}>Items on Sale</Text>
      <View style={styles.gridContainer}>
        {saleData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.saleCard}
            onPress={() =>
              router.push({ pathname: "/ProductDetails", params: { item } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.saleImage} />
            <Text style={styles.saleTitle}>{item.name}</Text>
            <Text style={styles.originalPrice}>
              Original Price: ${item.originalPrice}
            </Text>
            <Text style={styles.salePrice}>Sale Price: ${item.salePrice}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 18,
    color: "#666",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ed7014",
  },
  profileButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredImage: {
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  saleCard: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  saleImage: {
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  saleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#888",
  },
  salePrice: {
    fontSize: 16,
    color: "#ff3d00",
  },
  addToCartButton: {
    backgroundColor: "#ed7014",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
