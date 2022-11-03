import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Signin from './src/screen/Signin';
import Signup from './src/screen/Signup';
import Update from './src/screen/Update';
import FlashMessage from "react-native-flash-message";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import Create from './src/screen/Create';
 
// Your web app's Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyCUGITlN-5XnGZhw9CVNBOu4hIgbSThe2A",
  authDomain: "app1-e79c0.firebaseapp.com",
  projectId: "app1-e79c0",
  storageBucket: "app1-e79c0.appspot.com",
  messagingSenderId: "147589302772",
  appId: "1:147589302772:web:c2eaef049b6cb0970891a1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  }
}
const Stack = createNativeStackNavigator();

export default function App() {
  // const user = false; //not authenticated
  const[loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // checking user logged in or not
  useEffect(()=>{
    const authSubscription = onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user)
        setLoading(false)
      }else{
        setUser(null)
        setLoading(false)
      }
    })
    return authSubscription;
  }, [])

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator >
        {
          user ?(
           <>
            <Stack.Screen name="Home" options={{headerShown: false}}> 
              {/* Passing user in screen */}
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create"> 
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen> 
            <Stack.Screen name="Update" component={Update} />
          </>
          ):( 
          <>
            <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}

      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
