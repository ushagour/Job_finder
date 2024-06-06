import { useState,useEffect } from "react";

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,SafeAreaView, ScrollView,View } from 'react-native';
import { Stack, useRouter } from "expo-router";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text} from '@/components/Themed';
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { useAuth } from  '../firebase/AuthContext';

export default function ModalScreen() {

  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("");
  const {user} = useAuth();
  const [city, setCity] = useState("Rabat");
  const [region, setRegion] = useState("Rabat-Salé-Kénitra");









  return (
    <>
  

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
   
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }} >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn  iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='70%'
             HandelOnPress={()=>{  }} />
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
  );
}


