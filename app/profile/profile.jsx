import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, SIZES,images } from '../../constants';
import { ScreenHeaderBtn, LikedJob } from '../../components';
import { useLikedJob } from '../../hook/context/LikedJobContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

import styles from './profile.style';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { removeLikedJob } = useLikedJob();
  const router = useRouter();


  const avatarUrl = user?.avatar || 'https://example.com/default-avatar.png';

  const [loading, setLoading] = useState(true);
  const [likedJobs, setLikedJobs] = useState([]);

  const fetchLikedJobs = useCallback(async () => {
    if (!user) return;
    
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'likedJobs', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const likedJobsData = userDocSnap.data().likedJobs || [];
        setLikedJobs(likedJobsData);

      } else {
        console.log("No liked jobs found for this user.");
        setLikedJobs([]);
      }
    } catch (error) {
      console.error('Error fetching liked jobs:', error);
      setLikedJobs([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  
  useEffect(() => {


    // console.log(user?.avatar)
    fetchLikedJobs();
  }, [fetchLikedJobs]);



  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Log Out', onPress: () =>     signOut() },
      ],
      { cancelable: false }
    );
  };
  


  const handleDeslike = async (likedJobIdToRemove) => {
    if (user) {
      removeLikedJob(user.uid, likedJobIdToRemove);
      await fetchLikedJobs();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.home} 
              dimension="60%" 
              HandelOnPress={() => router.push('/')} 
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.logout} 
              dimension="60%" 
              HandelOnPress={handleLogout} 
            />
          ),
          headerTitle: '',
        }}
      />
      <View style={styles.userInfoHeader}>
        
        <Image  source={{ uri: avatarUrl }}  style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          {user?.email && <Text style={styles.bio}>{user.email}</Text>}
        </View>
        <TouchableOpacity style={styles.editButton}>
          <ScreenHeaderBtn 
            iconUrl={icons.edit} 
            dimension="60%" 
            HandelOnPress={() => router.push('/profile/Edit/EditProfile')} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContent}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <LikedJob jobs={likedJobs.join(",")} deslike={handleDeslike} refresh={fetchLikedJobs} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
