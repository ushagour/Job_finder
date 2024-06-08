import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Location from 'expo-location';

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { useAuth } from '../firebase/AuthContext';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, user_loading } = useAuth();
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);

  const fetchCityName = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      let city = addressResponse[0].city;
      let region = addressResponse[0].region;
      return { city, region };
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  };

  const redirectMe = () => {
    if (user) {
      router.push(`/profile/profile`);
    } else {
      router.push(`/profile/login/Login`);
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      const info = await fetchCityName();
      if (info) {
        setCity(info.city);
        setRegion(info.region);
        console.log(info.city);
        console.log(info.region);
      }
    };

    getLocation();
  }, []);

  if (user_loading) {
    return <Text>Loading...</Text>;
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
            <Popularjobs country={region} />
            <Nearbyjobs city={region} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
