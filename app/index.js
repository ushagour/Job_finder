import { useState,useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View,Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Location from 'expo-location';

import { COLORS, icons, images, SIZES } from "../constants";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { useAuth } from  '../firebase/AuthContext';

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const {user} = useAuth();
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);


  const fetchCityName = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }
  
      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  
      // Get the latitude and longitude from the location object
      const { latitude, longitude } = location.coords;
  
      // Use a reverse geocoding service to get the city name from the coordinates
      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      let city = addressResponse[0].city;
      let region = addressResponse[0].region;
      return {city,region};//it returns an object 
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  };

 function redirectMe(){

    if (user!== null) {
     router.push(`/profile/profile`)
     
    } else {

      router.push(`/profile/login/Login`);

    }


  }


  useEffect(() => {
    const getLocation = async () => {
      const info = await fetchCityName();//async function retuens an object 
      setCity(info.city);
      setRegion(info.region);
      console.log(info.city);
      console.log(info.region);

    };

    getLocation();
  }, []);

  // console.log("con"+user.uid);

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
            <ScreenHeaderBtn iconUrl={images.profile} dimension='70%'
             HandelOnPress={()=>{ redirectMe() }} />
          ),
          headerTitle: "",
        }}
      />


      <ScrollView>
        <View  style={{flex:1,padding:SIZES.medium}} >

          <Welcome  
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
            />
          <Popularjobs
          country={region}

          />
          <Nearbyjobs
          city={region}

          
          />


        </View>
      </ScrollView>

</SafeAreaView>
</>
  
  )
}
 export default Home