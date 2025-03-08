import React from 'react'

import {AntDesign, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomePage/HomeScreen';
import FavouriteScreen from './HomePage/FavouriteScreen';
import CartScreen from './HomePage/CartScreen';
import ProfileScreen from './HomePage/ProfileScreen';


const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#fff', height: 70 },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: '#F36C24',  //khi an vao thi hien mau gi do
      tabBarInactiveTintColor: '#999',  // mau ban dau
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavouriteScreen}
      options={{
        tabBarLabel: 'Favorite',
        tabBarIcon: ({ color }) => (
          <AntDesign name="heart" color={color} size={24} />
        ),
      }}
    />

<Tab.Screen
      name="Cart" // giống id, định danh
      component={CartScreen}
      options={{
        tabBarLabel: 'Cart', //tên hiển thị
        tabBarIcon: ({ color }) => (
          <AntDesign name="shoppingcart" color={color} size={24} />
        ),
      }}
    />

<Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-circle-outline" color={color} size={24} />
        ),
      }}
    />

  </Tab.Navigator>




  )
}

export default BottomTabNavigator