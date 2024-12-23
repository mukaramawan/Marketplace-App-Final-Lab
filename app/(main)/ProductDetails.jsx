import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const ProductDetails = () => {
  const router = useRouter();
  const params = router.params; // Get params
  const item = params?.item; // Safely access item

  if (!item) {
    // Handle the case where item is undefined
    return <Text>Error: Item not found</Text>;
  }

  // Render the component if item is found
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.salePrice}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerTitle}>Seller Information</Text>
          <Text style={styles.sellerName}>{item.sellerName}</Text>
          <Text style={styles.sellerRating}>Rating: {item.sellerRating} ★</Text>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#ed7014",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sellerInfo: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
    marginTop: 15,
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sellerName: {
    fontSize: 16,
    color: "#000",
  },
  sellerRating: {
    fontSize: 16,
    color: "#ff3d00",
  },
  addToCartButton: {
    backgroundColor: "#ed7014",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetails;