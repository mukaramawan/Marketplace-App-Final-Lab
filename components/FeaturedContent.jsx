import { Dimensions, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FeaturedContent = () => {
  const screenWidth = Dimensions.get("window").width;
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      const { data: FeaturedContent, error } = await supabase
        .from("FeaturedContent")
        .select("*");

      if (error) {
        setFeaturedData([]);
        console.log("Error in fetching featured data");
      } else {
        setFeaturedData(FeaturedContent);
      }
    };
    fetchFeaturedData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default FeaturedContent;

const styles = StyleSheet.create({
  featuredContainer: {
    marginBottom: 20,
  },
  featuredImage: {
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});
