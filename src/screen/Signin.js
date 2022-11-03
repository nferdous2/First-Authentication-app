import {
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";

export default function Signin({ navigation }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log("Successfully loged in -->", res);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/login.png")}
        style={{ width: "100%", height: 300 }}
      />
      <Text style={styles.noteText}>Never forget your notes</Text>
      <View style={styles.Inputcontainer}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      {/* link to signUp*/}
      <View style={styles.link}>
        <Button
          title="Signin"
          onPress={signin}
          customStyles={{ alignSelf: "center", marginBottom: 20 }}
        ></Button>
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text>Don't have an account? </Text>
          <Text style={{ color: "green" }}>Signup</Text>
        </Pressable>
      </View>
      <StatusBar style={{ color: "black" }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noteText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 20,
  },
  Inputcontainer: {
    paddingHorizontal: 10,
    marginVertical: 40,
  },
  link: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
});
