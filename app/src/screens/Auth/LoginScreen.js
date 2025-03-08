import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please enter both email and password');
        } else {
            // Xử lý đăng nhập ở đây
            login({ email, password }).then(async (response) => {
                await AsyncStorage.setItem('accessToken', response.accessToken);
                await AsyncStorage.setItem('refreshToken', response.refreshToken);
                await AsyncStorage.setItem('userInfo', JSON.stringify(response.userInfo));
                navigation.navigate("Home")
            })
                .catch(error => {
                    Toast.show({
                        type: 'error',
                        text1: 'Hello',
                        text2: 'Mat khau loi'
                    });

                });

        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotText: {
        textAlign: 'center',
        color: '#007bff',
        fontSize: 14,
    },
});

export default LoginScreen;
