import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/screens/BottomNavigation';
import LoginScreen from './src/screens/Auth/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  </NavigationContainer>
  <Toast/>
  </>
    

  );
}
