import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="HomePage" options={{
                tabBarIcon: ({ focused, color, size }) =>
                    <Image source={require('../../../assets/images/house.png')}
                        style={{ width: size, height: size, opacity : focused ? 1 : 0.5 }} />
            }} />

            <Tabs.Screen name="Favorite" options={{
                tabBarIcon: ({ focused, color, size }) =>
                    <Image source={require('../../../assets/images/wish-list.png')}
                        style={{ width: size, height: size, opacity : focused ? 1 : 0.5 }} />
            }} />
            <Tabs.Screen name="Cart" options={{
                tabBarIcon: ({ focused, color, size }) =>
                    <Image source={require('../../../assets/images/shopping-cart.png')}
                        style={{ width: size, height: size, opacity : focused ? 1 : 0.5 }} />
            }} />
            <Tabs.Screen name="Profile" options={{
                tabBarIcon: ({ focused, color, size }) =>
                    <Image source={require('../../../assets/images/avatar-design.png')}
                        style={{ width: size, height: size, opacity : focused ? 1 : 0.5 }} />
            }} />


        </Tabs>
    )
}

const styles = StyleSheet.create({})