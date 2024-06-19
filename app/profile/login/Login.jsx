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

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push('/profile/profile');
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      Alert.alert('Error', errorMessage);
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'User not found!',
      'auth/invalid-email': 'Email is invalid!',
      'auth/invalid-credential': 'Password is invalid!',
      'auth/too-many-requests': 'Too many requests, try later!',
      default: 'An error occurred!',
    };
    return errorMessages[errorCode] || errorMessages.default;
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
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/profile/login/Registre')}
            style={[styles.button, styles.buttonOutLine]}
          >
            <Text style={[styles.buttonText, styles.buttonTextOutLine]}>
              Register
            </Text>
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
            source={{
              uri:
                'https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png',
            }}
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
