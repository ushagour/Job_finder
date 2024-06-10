import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { COLORS, images } from '../../../constants';
import styles from './login.style'; // Import the shared styles from the login screen
import { Stack, useRouter } from 'expo-router';
import { app } from '../../../firebase/config'; // Import your Firebase app instance

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Validate inputs
      if (!email || !name || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const firestore = getFirestore(app);
      const auth = getAuth(app);

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        displayName: name,
        avatar: images.profile,
        email: email,
      });
      
      console.log(`User with UID ${user.uid} registered successfully`);
      router.push(`/profile/profile`);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
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
          <Text style={styles.headerTitle}>Register</Text>
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
            placeholder="Name"
            placeholderTextColor={COLORS.gray}
            value={name}
            onChangeText={text => setName(text)}
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
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.gray}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/profile/login/Login')}
            style={[styles.button, styles.buttonOutLine]}
          >
            <Text style={[styles.buttonText, styles.buttonTextOutLine]}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        {/* Line */}
        <View style={styles.lineStyle}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <TouchableOpacity onPress={() => router.push('/')} style={[styles.button, styles.buttonOutLine]}>
          <Text style={[styles.buttonText, styles.buttonTextOutLine]}>Go to Home</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
