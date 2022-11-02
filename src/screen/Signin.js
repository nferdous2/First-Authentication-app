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
import Input from "../components/Input";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";



export default function Signin({ navigation }) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading,setLoading] = useState(false);
  const[error,setError] = useState(null);

  const signin = () =>{
    signInWithEmailAndPassword(auth, email, password).then((res)=>{
      console.log("Successfully loged in -->", res)
    })
  }
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
      
       <Input placeholder="Email"
       autoCapitalize={"none"}

       />
      
        <Input
      
          placeholder="PassWord"
      
         secureTextEntry // for hide the pass
      
          />   
          {error && <Text style={{color:"red",marginTop:10}}>{error}</Text>}

      </View>

        {/* link to signUp*/}
        <View style={styles.link} >
        <Button title="Signin" onPress={signin} customStyles={{ alignSelf: "center", marginBottom: 20 }} ></Button>
        <Pressable style={{flexDirection: 'row'}} onPress={()=> {navigation.navigate("Signup")}}>
          <Text>Don't have an account? </Text>
          <Text style={{ color: "green" }}>Signup</Text>
        </Pressable>
      </View>
      <StatusBar style={{color: 'black'}} />
{/* 
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
     
      </View> */}
    
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
    justifyContent: 'flex-end',
    alignItems: "center",
    paddingBottom: 30,
  }
});
