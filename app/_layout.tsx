import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../firebase/AuthContext';
import { LikedJobProvider } from '../hook/context/LikedJobContext';
import { LocationProvider } from '../hook/context/LocationContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.



export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded, fontsError] = useFonts({
    spaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsError) {
      console.error('Fonts loading error:', fontsError);
      throw fontsError;
    }
  }, [fontsError]);
  
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch((error) => {
        console.error('Splash screen hiding error:', error);
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
          <LocationProvider>
            <LikedJobProvider>
              <Stack  />
            </LikedJobProvider>
          </LocationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
