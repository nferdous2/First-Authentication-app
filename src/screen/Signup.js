import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../App";
import { showMessage } from "react-native-flash-message";

export default function Signup({ navigation }) {
  const [loading, setLoading] = useState(true);
  const genderOptions = ["Male", "Female"];
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const signUp = async () => {
    setLoading(true);
    try {
      // create user auth
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // add user profile to database
      await addDoc(collection(db, "users"), {
        name:name,
        email:email,
        age:age,
        gender:gender,
        uid: result.user.uid,
      });
      
      setLoading(false);  //find the user
 
    } 
    catch (error) {
      console.log(error);
      showMessage({
        message: "Error",
        type: "danger",
      });
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Inputcontainer}>
      
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full Name"
          onChangeText={(text) => setName(text)}
          autoCapitalize={"words"}
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <View>
          <Text style={{ marginVertical: 20 }}>Select gender</Text>
        </View>
        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => {
                setGender(option);
              }}
              style={styles.radioContainer}
              key={option}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCirlce,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCirlce,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* link to SIGNIN*/}
      <View style={styles.link}>
        <Button
          title="Signup"
          customStyles={{ alignSelf: "center", marginBottom: 20 }}
          onPress={signUp}
        />
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text>Already have an account? </Text>
          <Text style={{ color: "green" }}>Signin</Text>
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
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedOuterCirlce: {
    borderColor: "orange",
  },
  selectedInnerCirlce: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
