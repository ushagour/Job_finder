import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, Button, Text, TextInput, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';
import { app } from '../../../firebase/config';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Formik, Field, FormErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormField from '../../../components/FormField'; // Adjust the import path as needed
import styles from './styles'; // Assuming styles are defined in a separate file

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // Add more fields as needed
});

const EditProfile = () => {
  const router = useRouter();
  const { user, signOut, likedJobs } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user ? user.displayName : '',
    email: user ? user.email : '',
  });

  useEffect(() => {
    if (user) {


      console.log(user);
      setProfileData({
        name: user.displayName || '',
        email: user.email || '',
      });
    }


    console.log(profileData);
  }, [user]);

  const handleSaveProfile = async (values) => {
    try {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;

      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: values.name,
        });



        Alert.alert('Profile updated successfully');
      } else {
        Alert.alert('User is not authenticated');
      }
    } catch (error) {
      Alert.alert('Error updating profile', error.message);
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
            iconUrl={icons.left} 
            dimension="60%" 
            HandelOnPress={() => router.back()} 
          />
        ),
      
        headerTitle: '',
      }}
    />
    <View style={styles.container}>
      <Formik
        initialValues={profileData}
        validationSchema={EditProfileSchema}
        onSubmit={handleSaveProfile}
        enableReinitialize
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <FormField
              label="Name"
              name="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors.name}
              touched={touched.name}
            />
            <FormField
              label="Email"
              name="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <Button title="Save Changes" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
    </SafeAreaView>
  );
};

export default EditProfile;
