import {
  Text,
  SafeAreaView,
  Image,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Signin({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images.png")}
        style={{ alignSelf: "center" }}
      />

      <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}>
        Never forget your notes
      </Text>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>   
      
       <Input placeholder="Email"/>
      
        <Input
      
          placeholder="PassWord"
      
         ecureTextEntry // for hide the pass
      
          />   

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
       
          title={"login"}
       
          customStyles={{
       
            alignSelf: "center",
       
            marginBottom: 60,
       
          }}
       
        />


      
        <Pressable
      
          onPress={() => {
      
            navigation.navigate("Signup");
      
          }}
      
        >
      
          <Text>
      
            Don't Have An Acoount ?{" "}
      
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign Up</Text>
      
          </Text>
      
        </Pressable>
     
      </View>
    
    </SafeAreaView>
  );
}


