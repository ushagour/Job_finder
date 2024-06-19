import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { getAuth } from "firebase/auth";
import { app } from "../../../firebase/config";
import { COLORS, FONT, SIZES } from "../../../constants";
import { useAuth } from '../../../firebase/AuthContext';

import styles from './login.style';

const Login = () => {
  const { signIn } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line to define setError state

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // Redirect to another page upon successful login if needed
      router.push('/profile/profile');
    } catch (error) {




      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email wrong !';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'password wrong !';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests, try later!';
          break;
        default:
          errorMessage = 'An error occurred!';
      }
      Alert.alert('Error', errorMessage);

  
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Login</Text>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile/login/Registre')} style={[styles.button, styles.buttonOutLine]}>
            <Text style={[styles.buttonText, styles.buttonTextOutLine]}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineStyle}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <TouchableOpacity onPress={() => {}} style={styles.boxStyle}>
          <Image
            style={styles.imageStyle}
            source={{ uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/')} style={[styles.button, styles.buttonOutLine]}>
          <Text style={[styles.buttonText, styles.buttonTextOutLine]}>Go to Home</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
