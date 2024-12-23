import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import Input from "@/components/Input";
import Button from "../../components/Button";
import { theme } from "@/constants/theme";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

import { useRef, useState } from "react";

function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmpasswordRef = useRef("");

  const onSignup = async () => {
    if (
      !nameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmpasswordRef.current
    ) {
      Alert.alert("Sign Up!", "Please fill all the Fields!");
    } else {
      setLoading(true);

      const name = nameRef.current.trim();
      const email = emailRef.current.trim();
      const password = passwordRef.current.trim();

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            email: email,
            password: password,
          },
        },
      });

      console.log("session: ", session);
      router.replace("/screens/Login");

      if (error) {
        setLoading(false);
        Alert.alert(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginTxt}>Create your Account</Text>
      <Text style={styles.subloginTxt}>
      Discover, Shop, Revel !
      </Text>

      <Input
        placeholder="Name"
        onChangeText={(value) => {
          nameRef.current = value;
        }}
      />

      <Input
        placeholder="Email"
        onChangeText={(value) => {
          emailRef.current = value;
        }}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => {
          passwordRef.current = value;
        }}
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(value) => {
          confirmpasswordRef.current = value;
        }}
      />

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 10, marginBottom: 20 }}
          size="large"
          color="#ed7014"
        />
      ) : (
        <Button title="Sign Up" onPress={onSignup} />
      )}

      <View style={styles.signinContainer}>
        <Text style={{ color: "#666" }}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/screens/Login");
          }}
        >
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Or Continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome name="google" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome name="facebook" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  loginTxt: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subloginTxt: {
    fontSize: 16,
    color: theme.colors.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signinText: {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginLeft: 5,
  },
  orText: {
    textAlign: "center",
    color: theme.colors.gray,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    height: 50,
    width: 50,
    padding: 8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 25,
  },
});

export default Signup;
