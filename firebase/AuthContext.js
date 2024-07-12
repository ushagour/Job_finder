import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase/config'; // Adjust the path as needed
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
  //     if (userAuth) {
  //       await getUserProfile(userAuth);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const getUserProfile = async (user) => {
    try {
      const userId = user.uid;
      const firestore = getFirestore(app);
      const usersCollectionRef = collection(firestore, 'profiles');
      const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', userId)));

      if (!querySnapshot.empty) {
        const userDocSnap = querySnapshot.docs[0];
        const userData = userDocSnap.data();
        setUser(userData);
      } else {
        console.log("User profile not found.");
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await getUserProfile(userCredential.user);
      
    } catch (error) {
      throw error;
    }
  };

  // const register = async (email, password, additionalData) => {
  //   try {
  //     const auth = getAuth(app);
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     // Save additional user data to Firestore
  //     const firestore = getFirestore(app);
  //     await setDoc(doc(firestore, 'profiles', user.uid), {
  //       uid: user.uid,
  //       email: user.email,
  //       ...additionalData,
  //     });

  //     await getUserProfile(user);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await getUserProfile(user);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      throw error;
    }
  };

  const updateProfile = async (uid, updatedData) => {
    try {
      const firestore = getFirestore(app);
      await setDoc(doc(firestore, 'profiles', uid), updatedData, { merge: true });
      await getUserProfile({ uid });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const auth = getAuth(app);
      await firebaseSignOut(auth);
      setUser(null);
      router.push(`/profile/login/Login`);
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, updateProfile, signOut }}>
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
