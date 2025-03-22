import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'


import { Link, Redirect, router, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Toast from 'react-native-toast-message'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/src/redux/authSlice'
import { loginAPIs } from '@/src/apis/axios'


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const dispath = useDispatch()
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href={'/Tabs/HomePage'} />
  }

  const handleLogin = async () => {
    setErrorEmail('')
    setErrorPassword('')
    if (!email) {
      setErrorEmail('Please enter email')
      return
    }
    if (!email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')) {
      setErrorEmail("Email don't match format! Ex: abc@xyz.com ")
      return
    }
    if (!password) {
      setErrorPassword('Please enter password')
      return
    }
    await loginAPIs(email, password)
      .then(async (result: any) => {

        await AsyncStorage.setItem('accessToken', result.accessToken)
        await AsyncStorage.setItem('refreshToken', result.refreshToken)
        dispath(setUser(result))

        console.log(result);
        
        router.push('/Tabs/HomePage')

      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.message,

        })
      })

// router.push('/Tabs/HomePage')
    

  }



    return (
      <View style={{ backgroundColor: '#F5EDE0', flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/logo.gif')} style={styles.image} />
        </View>
        
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please enter your Email and Password</Text>
  
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your email?'
            placeholderTextColor={'#A1887F'}
            onChangeText={e => setEmail(e.trim())}
          />
          {errorEmail && (
            <View style={styles.errorContainer}>
              <Ionicons name='alert-circle-outline' size={20} color={'red'} />
              <Text style={styles.errorText}>{errorEmail}</Text>
            </View>
          )}
        </View>
  
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder='Enter your password?'
              placeholderTextColor={'#A1887F'}
              secureTextEntry={!togglePassword}
              onChangeText={e => setPassword(e)}
            />
            <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
              <Ionicons name={togglePassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={'#6F4E37'} />
            </TouchableOpacity>
          </View>
          {errorPassword && (
            <View style={styles.errorContainer}>
              <Ionicons name='alert-circle-outline' size={20} color={'red'} />
              <Text style={styles.errorText}>{errorPassword}</Text>
            </View>
          )}
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Button onPress={() => handleLogin()} title='Login' color={'#6F4E37'} />
        </TouchableOpacity>
        
        {/* Sign Up Option */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    imageContainer: {
      alignItems: 'center',
      marginBottom: 20
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#6F4E37',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: '#8D6E63',
      textAlign: 'center',
      marginBottom: 20
    },
    inputContainer: {
      marginBottom: 15
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#6F4E37'
    },
    input: {
      backgroundColor: '#FAF3E0',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#8D6E63',
      color: '#6F4E37'
    },
    passwordWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#8D6E63',
      borderBottomWidth: 1,
    },
    passwordInput: {
      backgroundColor: '#FAF3E0',
      padding: 12,
      borderRadius: 8,
      flex: 1,
      borderWidth: 1,
      borderColor: '#8D6E63',
      color: '#6F4E37'
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5
    },
    errorText: {
      color: 'red',
      marginLeft: 5
    },
    loginButton: {
      marginVertical: 20,
      borderRadius: 10,
      overflow: 'hidden'
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    signupText: {
      color: '#6F4E37'
    },
    signupLink: {
      textDecorationLine: 'underline',
      color: '#D2691E',
      fontWeight: 'bold'
    }
  });

