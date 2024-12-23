import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/constants/theme";
import Button from "@/components/Button";

function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/MarketplaceLogo.png")}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>Daraz</Text>

      <Text style={styles.subheading}>Pakistan's best Online Marketplace!</Text>

      <Button
        title="Getting Started"
        onPress={() => {
          router.push("/screens/Login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subheading: {
    fontSize: theme.size.xl,
    color: "#666",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default Welcome;
