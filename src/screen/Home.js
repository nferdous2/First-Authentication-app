import { View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../App";

export default function Home({ navigation, route, user }) {
  // console.log("user.......>", user);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    //creating query/queue
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    //creating listener

    const noteListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setLoading(false);
    });
    return noteListenerSubscription;
  }, []);

  // console.log("Notes", notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 30,
          borderRadius: 16,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate("Update", { item });
        }}
      >

      {/* delete works */}
        <Pressable
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            padding: 15,
            zIndex: 4,
          }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id));
          }}
        >
          <AntDesign name="delete" size={24} color="white" />
        </Pressable>

        <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
        <Text style={{ color: "white", fontSize: 18, marginTop: 15 }}>
          {description}
        </Text>
      </Pressable>
    );
  };

  const onPressCreate = () => {
    navigation.navigate("Create");
  };


if(loading)
{
  return(
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator/>
    </SafeAreaView>
  )
}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>My Notes</Text>

        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      {/* showing lists  */}
      <View>
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
