import { StyleSheet} from 'react-native';
import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Signin from './src/screen/Signin';
import Signup from './src/screen/Signup';
import Edit from './src/screen/Edit';
import Create from './src/screen/Create';
import { initializeApp } from "firebase/app";


const firebaseConfig = {

};


const app = initializeApp(firebaseConfig);

const AppTheme ={
  ...DefaultTheme,
   colors:{
    ...DefaultTheme.colors,
    background:"#fff",
   }
}

const Stack = createNativeStackNavigator();

export default function App() {

  const user = false; //non authenticate

  return (
    <NavigationContainer theme={AppTheme}>
      
      <Stack.Navigator>
{user ? (
    <>
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Create" component={Create} />
   
    </>
  ):

   (
      <>
       <Stack.Screen 
       name="Signin" 
       component={Signin}
       options={{headerShown:false}} 

       />
        <Stack.Screen name="Signup" component={Signup} />
     
      </>
  )}

      </Stack.Navigator>

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
