import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { useAuth } from '../firebase/AuthContext';
import { useLocation } from '../hook/context/LocationContext';

const Home = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { city, region, isLoading: isLocationLoading } = useLocation();

  // console.log(user);

  const navigateToProfile = () => {
    const profileRoute = user ? '/profile/profile' : '/login/Login';
    router.push(profileRoute);
  };

  useEffect(() => {
    if (!isLocationLoading && region && city) {
      console.log(`Location loaded: ${region}, ${city}`);
    }
  }, [isLocationLoading, region, city]);

  if (isLocationLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.user}
              dimension="70%"
              HandelOnPress={navigateToProfile}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        <Welcome
          searchTerm={''}
          setSearchTerm={() => {}}
          handleClick={() => {}}
        />
        <Popularjobs country={region || "Morocco"} />
        <Nearbyjobs city={city || "Rabat"} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
  },
  scrollContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
});

export default Home;
