import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const ItemsOnSale = () => {
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
      }
    };
    fetchSalesData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default ItemsOnSale;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
