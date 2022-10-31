import {
  Text,
  SafeAreaView,
  Image,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const genderOptions = ["Male", "Female"];

export default function Signup() {
  // const selected = true;

  const [gender, setGender] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");


  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user created",user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />

        <Input
          placeholder="PassWord"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        {/* //secureTextEntryt use for hide pass  */}

        <Input placeholder="Full Name" onChangeText={(text) => setName(text)} />

        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

        <View style={{ marginVertical: 20 }}>
          <Text>Select Gender </Text>
        </View>

        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioContainer}
            >
              <View
                style={[
                  styles.outerCircle,

                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,

                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>

              <Text style={styles.radioText}> {option}</Text>
            </Pressable>
          );
        })}

        {/* <Pressable style={styles.radioContainer}>
          <View
            style={[styles.outerCircle, selected && styles.selectedOuterCircle]}
          >
            <View
              style={[
                styles.innerCircle,
                selected && styles.selectedInnerCircle,
              ]}
            />
          </View>

          <Text style={styles.radioText}> Female</Text>
        </Pressable> */}
      </View>

      <View
        style={{
          flex: 1,

          justifyContent: "flex-end",

          alignItems: "center",

          marginBottom: 15,
        }}
      >
        <Button
          title={"Sign Up"}
          onPress={signup}
          customStyles={{
            alignSelf: "center",

            marginBottom: 60,
          }}
        />

        <Pressable>
          <Text>
            Already Have An Acoount ?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign In</Text>
            Male
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#B2BBBE",
    fontSize: 16,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "orange",
  },
  radioText: {
    marginLeft: 15,
  },

  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "#F5554E",
  },
});
