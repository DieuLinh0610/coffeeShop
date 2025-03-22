import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/src/redux/authSlice'

export default function ProfileFeature() {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.auth.user)
  console.log(currentUser);

  const handleLogout = async () => {
    dispatch(logout())
    router.replace('/Auth/Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
                    <Image source={require('../../../assets/images/avatar-profile.png')}
          style={styles.avatar}/>
        <Text style={styles.name}>{currentUser.userName}</Text>

        {/* User info in boxes */}
        <View style={styles.infoBox}>
          <Text style={styles.info}>📧 Email: {currentUser.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.info}>📍 Address: {currentUser.location}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.info}>📞 Phone: {currentUser.phoneNumber}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.info}>💰 Coin: 1500</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.info}>🎂 DOB: {String(currentUser.dateOfBirth)}</Text>
        </View>

        {/* Buttons in one row */}
        <View style={styles.buttonRow}>
        <Button title="Edit Profile" onPress={() => router.push('/Profile/EditProfile')} color="#6F4F1F" />
        <Button title="Logout" onPress={handleLogout} color="#6F4F1F" />
        </View>
      </View>
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#6F4F1F',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6F4F1F',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
