import React,{useState,useEffect} from 'react';
import IntroPages from './pages/IntoPages/IntroPages';

import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import HomeScreen from './pages/HomeScreen/HomeScreen';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';



const App = () => {
 const [user,setUser] = useState(); 

 // Giriş yapılıp yapılmadığını kontrol eden useEffect kodu
 useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return () => {
    unsubscribe();
  };
 })

 return (
  // Eğer giriş yapılmışsa ana sayfaya yönlendir yapılmamışsa IntroPages sayfasına yönlendir.
    user 
    ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='HomeScreen' component={HomeScreen}/>
          <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
    : <IntroPages/>
 )

};


export default App;