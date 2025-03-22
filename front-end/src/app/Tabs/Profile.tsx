import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileFeature from '@/src/components/Profile/ProfileFeature'
import { useSelector } from 'react-redux'

export default function Profile() {
 
  
  return (
    <View >
      
      <ProfileFeature />
    </View>
  )
}

const styles = StyleSheet.create({});
