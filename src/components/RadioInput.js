import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function RadioInput({ label, value, setValue, size = "big" }) {
  const isSelected = value === label;

  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.container}>
        <View
          style={[
            styles.outerCircle,
            isSelected && styles.selectedOuterCirlce,
            size === "big" && styles.bigOuterCircle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCirlce,
              size === "big" && styles.bigInnerCircle,
            ]}
          />
        </View>
        <Text style={{ marginLeft: 10, fontWeight: "bold" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
  bigInnerCircle: {
    // height: 30,
    // width: 30,
    borderRadius: 15,
    // borderWidth: 1,
    borderColor: "#cfcfcf",
    // marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bigOuterCircle: {
    // height: 15,
    // width: 15,
    // borderRadius: 7,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
});
