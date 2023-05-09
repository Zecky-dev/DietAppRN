import React,{useState,useEffect, useLayoutEffect, useRef} from 'react';
import IntroPages from './pages/IntoPages/IntroPages';

import auth from '@react-native-firebase/auth';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeScreen from './pages/HomeScreen/HomePage';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import SharedRecipesScreen from './pages/SharedRecipesScreen/SharedRecipes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './utils/colors';


const BottomTabsNavigator = () => {

  
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        elevation: 0,
        borderTopWidth: 0,  
      },
      tabBarActiveBackgroundColor: colors.darkGreen,
      tabBarInactiveBackgroundColor: colors.lightGreen,
      tabBarLabelStyle: {color: 'white'},
    }}
    initialRouteName="Home">
    
    
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Icon name="home-circle" size={32} color={colors.white} />
          ) : (
            <Icon name="home-circle-outline" size={32} color={colors.white} />
          ),
        tabBarLabel: 'Anasayfa',        
      }}
    />


    <Tab.Screen
      name="Recipes"
      component={SharedRecipesScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Icon name="food" size={32} color={colors.white} />
          ) : (
            <Icon name="food-outline" size={32} color={colors.white} />
          ),
        tabBarLabel: 'Tarifler',
      }}
    />
    
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <Icon name="account" size={32} color={colors.white} />
          ) : (
            <Icon name="account-outline" size={32} color={colors.white} />
          ),
        tabBarLabel: 'Profil',
      }}
    />
  </Tab.Navigator>
  );
  
};




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
        <BottomTabsNavigator/>
      </NavigationContainer>
    )
    : <IntroPages/>
 )

};


export default App;