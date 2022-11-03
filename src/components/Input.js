import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Input({
  placeholder,
  secureTextEntry = false,
  onChangeText,
   value,
   autoCapitalize,
   multiline,

}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCorrect={false}
      value={value}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
  },
});
