import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app, auth } from '../../../firebase/config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { COLORS,images } from '../../../constants';

const Registre = () => {
  const router = useRouter();
  const firestore = getFirestore(app);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      // Validate inputs
      if (!email || !displayName || !password || !confirmPassword) {
        setError('All fields are required');
        alert(error)
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Store user data in Firestore
        const usersCollection = collection(firestore, 'users');
        await addDoc(usersCollection, {
          uid: user.uid,
          displayName: displayName,
          avatar: "../avatar.jpg",
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Stack.Screen options={{ headerShown: false }}>
        <View style={styles.headerwrapper}>
          <Text>ali</Text>
          <Text style={styles.headerTitle}>Register</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </Stack.Screen>

      <View style={styles.Inputscontainer}>
        <TextInput
          placeholder="Display Name"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.Buttunscontainer}>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.ButtunsText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/profile/login/Login`)} style={[styles.button, styles.buttonOutLine]}>
          <Text style={styles.ButtunsText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerwrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color:'black',
    fontSize: 33,
  },
  Inputscontainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 7,
    height: 40,
    fontSize: 16,
    color: 'black',
    borderWidth: 0.3,
    borderColor: '#ccc',
  },
  Buttunscontainer: {
    width: '60%',
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#023047',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOutLine: {
    backgroundColor: '#219ebc',
    borderColor: '#8ecae6',
    borderWidth: 2,
  },
  ButtunsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.danger,
    marginBottom: 10,
    textAlign: 'center',
  },
});
