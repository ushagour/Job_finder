import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image,Alert,ActivityIndicator } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import { COLORS, images } from '../../constants';
import styles from './login.style'; // Import the shared styles from the login screen
import { Stack, useRouter } from 'expo-router';
import { app } from '../../firebase/config'; // Import your Firebase app instance

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true); // Show activity indicator

    try {
      // Validate inputs
      if (!email || !name || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }
  
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');//to generate the error 
      }
  
      const firestore = getFirestore(app);
      const auth = getAuth(app);
  
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store user data in Firestore
      const usersCollection = collection(firestore, 'profiles');
      await addDoc(usersCollection, {
        uid: user.uid,
        displayName: name,
        avatar: 'https://via.placeholder.com/150',
        email: email,
      });
      
      console.log(`User with UID ${user.uid} registered successfully`);
      router.push(`/profile/profile`);
    } catch (error) {
      let errorMessage;
      switch (error.message) {
        case 'All fields are required':
          errorMessage = 'All fields are required';
          break;
        case 'Passwords do not match':
          errorMessage = 'Passwords do not match';
          break;
        default:
          switch (error.code) {
            case 'auth/user-not-found':
              errorMessage = 'User not found!';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email!';
              break;
            case 'auth/invalid-credential':
              errorMessage = 'Invalid credential!';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Too many requests, try later!';
              break;
            default:
              errorMessage = 'An error occurred!';
          }
      }
      Alert.alert('Error', errorMessage);
    }finally {
      setIsLoading(false); // Hide activity indicator after login attempt
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
        <Image
              source={require('./../../assets/logo/Job_logo-login.png')}
             style={styles.logo}
              resizeMode="contain"
            />       
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


          {isLoading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
          <TouchableOpacity
            onPress={() => router.push('/login/Login')}
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
