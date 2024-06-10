import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../../firebase/config";
import { COLORS, FONT, SIZES } from "../../../constants";

import styles from './login.style';


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Adjust the route accordingly
    } catch (error) {

      // console.log(error.code);
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found!';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'username or password wrong !';
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
            placeholderTextColor={COLORS.gray}
            placeholder="Password"

                        value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
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
