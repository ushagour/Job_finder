import React, { useEffect, useState } from 'react'
import { View, Text,TouchableOpacity,FlatList, TextInput,Image } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import  {icons, SIZES} from "../../../constants"
import { useAuth } from  '../../../firebase/AuthContext';

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const { user } = useAuth();
  const router =useRouter();
  const [activeJobType,setactiveJobType]= useState("full-time");
  const displayName = user ? user.displayName : '';

    
  const jobTypes =["full-time","Part-time","Freelace"];


  return (
    <View>
      <View style={styles.container}>
{user?(
          <Text style={styles.userName}>Hello  {displayName} </Text>

):null}
        <Text style={styles.welcomeMessage}>Find your perfect Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>

          <Image source={icons.search}
          resizeMode ="contain"
          style={styles.searchBtnImage}/>
        </TouchableOpacity>
     </View>


     <View style={styles.tabsContainer}>
     <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setactiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
     </View>
    </View>
  )
}

export default Welcome