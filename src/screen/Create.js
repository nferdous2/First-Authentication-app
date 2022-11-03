import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";
// import { async } from "@firebase/util";

//using array
const noteColorOptions = ["red", "blue", "green"];

export default function Create({ navigation, route, user }) {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  
  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      showMessage({
        message: "Notes created Successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <View>
        <Input
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          multiline={true}
        />

        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />

        <View style={{ marginTop: 25, marginBottom: 20 }}>
          <Text>Select Your Note Color</Text>
        </View>

        {noteColorOptions.map((option) => {
          const selected = option === noteColor;

          return (
            <Pressable
              onPress={() => {
                setNoteColor(option);
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
        
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Submit"
            customStyles={{
              alignSelf: "center",
              marginBottom: 20,
              marginTop: 60,
              width: "100%",
            }}
            onPress={onPressCreate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// {noteColorOptions.map((index, option) => {
//   <RadioInput
//     key={index}
//     label={option}
//     value={noteColor}
//     setValue={setNoteColor}
//   />
// })}

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
