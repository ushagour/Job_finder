import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [location_loading, setloading] = useState(true);





  async function requestLocationPermissions() {
    if (Platform.OS === 'android') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return false;
      }
    } else if (Platform.OS === 'ios') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return false;
      }
    }
    return true;
  }
  
  async function fetchCityName() {
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) return;
  
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const { latitude, longitude } = location.coords;

    let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
    let city = addressResponse[0].city;
    let region = addressResponse[0].region;

    setCity(city);
    setRegion(region);
    setloading(false)
  }



  useEffect(() => {
    fetchCityName();
  }, []);

  return (
    <LocationContext.Provider value={{ city, region,location_loading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
