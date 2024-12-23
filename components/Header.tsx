import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const { setAuth } = useAuth();
  const router = useRouter(); // Initialize the router

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign Out", "Error Signing Out!");
    }
  };
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greetingText}>Hello</Text>
        <Text style={styles.userName}>Mukaram Awan</Text>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
});
