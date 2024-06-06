import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text,TextInput, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../constants';
import { ScreenHeaderBtn} from '../../components';
import { app } from '../../firebase/config';
import { getFirestore} from 'firebase/firestore';

import styles from './EditProfile.style';
const EditProfile = () => {
  const router = useRouter();

  const { user, signOut,likedJobs } = useAuth();

  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState('');

  


  const firestore = getFirestore(app);
  


  const handleSaveProfile = async (name, email, bio) => {
    try {
      const currentUser = user
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }
  
      const userDocRef = firestore.collection('users').doc(currentUser.uid);
      await userDocRef.set({
        name,
        email,
        bio,
      }, { merge: true }); // Use merge option to update only provided fields without overwriting the entire document
  
      console.log('Profile saved successfully.');
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };






  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
<ScreenHeaderBtn iconUrl={icons.left} dimension="60%" HandelOnPress={() => router.back()} />
          ),
       
          headerTitle: '',
        }}
      />



<View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Bio"
        multiline
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>

   


    
    </SafeAreaView>
  );
};



export default EditProfile;
