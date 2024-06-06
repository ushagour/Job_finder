// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './config'; // Make sure to replace './firebase' with the correct path to your Firebase configuration
import {  useRouter } from 'expo-router';
import { getDoc, getFirestore, doc,getDocs,collection,query,where } from 'firebase/firestore';
import { app } from '../firebase/config';


const AuthContext = createContext();
const router = useRouter();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      // Check if userAuth exists and is not null
      if (userAuth) {
        // If userAuth exists, set the user object to the state
        // getLikedJobs(userAuth)
        getUserProfile(userAuth)


      }
    });
  
    // Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();

  }, []);
  




  const handelLogingGoogle = async () => {
    try {
      const { idToken } = await auth().signInWithGoogle();
      // Send idToken to your server for authentication
      console.log('Google sign-in successful!');

    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { idToken } = await auth().signInWithGitHubToken('GITHUB_ACCESS_TOKEN');
      // Send idToken to your server for authentication
    } catch (error) {
      console.error(error);
    }
  };


  const signIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      getUserProfile(userCredential.user)
      // getLikedJobs(userCredential.user)

    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };




 

 
  const getUserProfile = async (user) => {
    try {
      const userId = user.uid;
      const firestore = getFirestore(app);
      const usersCollectionRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', userId)));
  
      if (!querySnapshot.empty) {
        // Assuming there's only one document with the matching UID
        const userDocSnap = querySnapshot.docs[0];
        const userData = userDocSnap.data();
        setUser(userData);
        console.log(userData);    
      } else {
        console.log("User profile not found.");
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } 
  };
  


  const signOut = async () => {
    try {
      await auth.signOut();
      router.push(`/profile/login/Login`);
      setUser(null);
      
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut,handelLogingGoogle}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
