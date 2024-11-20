// This is the main file of the project. It contains the navigation system of the app, which is a bottom tab navigator.
// The arquitecture of the app is based on the use of Contexts, which are used to store the user information, and Navigation, which is used to navigate between the different screens of the app.

// This are the imports of the project.
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import FeedScreen from './components/Feed/Feed';
import ProfileScreen from './components/Profile/Profile';
import InfoScreen from './components/Info/Info';
import { AuthContext, AuthProvider } from './components/Contexts/AuthContext';

// This is a component that will create a tab navigator with three tabs: Feed, Profile and Info.
const Tab = createBottomTabNavigator();

// This is a component that will create a custom header for the app.
const CustomHeader = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>UCUInsider</Text>
    </View>
  </View>
);

// This is the main component of the app. It contains the navigation system of the app, which is a bottom tab navigator.
export default function App() {
  

  return (
    <AuthProvider> 
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => { // tabBarIcon is a function that will return an icon based on the route name, the color and the size of the icon.
              let iconName;

              if (route.name === 'Feed') {
                iconName = 'home';
              } else if (route.name === 'Perfil') {
                iconName = 'user';
              } else if (route.name === 'Info') {
                iconName = 'info';
              }

              return <Feather name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF4500',
            tabBarInactiveTintColor: 'gray',
            header: ({ route }) => <CustomHeader title={route.name} />,
          })}
        >
          <Tab.Screen name="Feed" component={FeedScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// This is the style of the component.
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    height: 80, 
    paddingHorizontal: 15,
    paddingTop: 30, 
  },
  headerTitle: {
    marginBottom: 1,
    color: 'white',
    fontSize: 22, 
    fontWeight: 'bold',
  },
  logoContainer: {
    marginBottom: 11,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  logoText: {
    color: '#FF4500',
    fontWeight: 'bold',
    fontSize: 18, 
  },
});