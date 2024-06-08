import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, SIZES } from '../../constants';
import { ScreenHeaderBtn, LikedJob } from '../../components';
import { useLikedJob } from '../../hook/context/LikedJobContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import styles from './profile.style';

const Profile = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { removeLikedJob } = useLikedJob();

  const [loading, setLoading] = useState(true);
  const [likedJobs, setLikedJobs] = useState(null);

  // Define likedJobs state with initial value null


  const getLikedJobs = async () => {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'likedJobs', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const likedJobsData = userDocSnap.data().likedJobs || [];
        const joinedLikedJobs = likedJobsData.join(',');
        setLikedJobs(joinedLikedJobs);
      } else {
        console.log("No liked jobs found for this user.");
        setLikedJobs(""); // Set likedJobs to empty string if no liked jobs found
      }
    } catch (error) {
      console.error('Error fetching liked jobs:', error);
      setLikedJobs(""); // Set likedJobs to empty string in case of error
    } finally {
      setLoading(false); // Set loading to false after fetching liked jobs
    }
  };

  useEffect(() => {
    getLikedJobs(); // Fetch liked jobs data when component mounts
    
  }, []);

  const handleLogout = () => {
    signOut();
  };

  const handleDeslike = async (likedJobIdToRemove) => {
    removeLikedJob(user.uid, likedJobIdToRemove);
    await getLikedJobs();

    // TODO You can optionally call getLikedJobs() here to refresh liked jobs after removing one
  };


  const handelrefresh = async ()=>{
    await getLikedJobs();
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.home} dimension="60%" HandelOnPress={() => router.push('/')} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.logout} dimension="60%" HandelOnPress={handleLogout} />
          ),
          headerTitle: '',
        }}
      />
      <View style={styles.userInfoHeader}>
        <Image source={{ uri: user?.avatar }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          {user && user.email && <Text style={styles.bio}>{user.email}</Text>}
        </View>
        <TouchableOpacity style={styles.editButton}>
          <ScreenHeaderBtn iconUrl={icons.edit} dimension="60%" style={styles.editButtonText} HandelOnPress={() => router.push('/profile/EditProfile')} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.contentText}>My liked jobs :</Text>
        {loading ? ( // Show loading indicator while fetching liked jobs
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <LikedJob jobs={likedJobs} deslike={handleDeslike} refresh={handelrefresh} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
