import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
// import { showMessage } from 'react-native-flash-message'

const noteColorOptions = ["red", "blue", "green"];

export default function Update({ navigation, route }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [loading, setLoading] = useState(false);
  const [noteColor, setNoteColor] = useState(noteItem.color);

  const onPressUpdate = async () => {

    
    const noteRef = doc(db,"notes",noteItem.id);
    // updating collection
    setLoading(true);

    //udate works
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView style={{ padding: 10, marginTop: 30 }}>
        <Input
          placeholder={title}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Input
          placeholder={description}
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
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
            onPress={onPressUpdate}
          />
        )}
      </ScrollView>
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
