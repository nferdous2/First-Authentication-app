import { View, Text, SafeAreaView, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import {  doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
// import { showMessage } from 'react-native-flash-message'

export default function Create({ navigation, route }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [loading, setLoading] = useState(false)

  const updateNote = async () => {
    // updating collection
    setLoading(true)
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        // color: noteColor,
      });
      setLoading(false)
      showMessage({
        message: "Notes created Successfully",
        type: "success"
      })
      navigation.goBack()
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>
      <ScrollView style={{ padding: 10, marginTop:30 }}>
        <Input
          placeholder={title}
          onChangeText={(text) => setTitle(text)}
          // value={title}
        />
        <Input
          placeholder={description}
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          // value={description} not working this way
        />
          <Button
            title="UPDATE NOTE"
            customStyles={{ alignSelf: "center", marginBottom: 20, width: '100%', marginTop: 30, backgroundColor: 'green', }}
            onPress={updateNote}
          />

      </ScrollView>
    </SafeAreaView>
  )
}
