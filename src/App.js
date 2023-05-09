import React, { useState, useEffect } from 'react';
import IntroPages from './pages/IntoPages/IntroPages';

import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import HomeScreen from './pages/HomePage/HomePage';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import colors from './utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'

const App = () => {
  const [user, setUser] = useState();

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
          <Tab.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Tab.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => 
                   (
                    focused
                      ? <Ionicons name='home' size={32} color={colors.black} />
                      : <Ionicons name='home-outline' size={32} color={colors.black} />
                  )
              }}
            />
            <Tab.Screen
              name='ProfileScreen'
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => 
                  (
                    focused
                      ? <FontAwesome name='user' size={32} color={colors.black} />
                      : <FontAwesome name='user-o' size={32} color={colors.black} />
                  )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )
      : <IntroPages />
  )

};


export default App;