import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "@/constants/theme";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  Text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
