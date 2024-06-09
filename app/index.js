import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
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
  const [searchTerm, setSearchTerm] = useState("");
  const { user, user_loading } = useAuth();
  const { city, region, location_loading } = useLocation();

  const redirectMe = () => {
    if (user) {
      router.push(`/profile/profile`);
    } else {
      router.push(`/profile/login/Login`);
    }
  };

  useEffect(() => {
    if (!location_loading) {
      console.log(`Location loaded: ${region}, ${city}`);
    }
  }, [location_loading, city, region]);



  if (location_loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={images.profile}
                dimension='70%'
                HandelOnPress={redirectMe}
              />
            ),
            headerTitle: "",
          }}
        />
        <ScrollView>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/search/${searchTerm}`);
                }
              }}
            />
            <Popularjobs country={region || "Morocco"} />
            <Nearbyjobs city={city || "Rabat"} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
