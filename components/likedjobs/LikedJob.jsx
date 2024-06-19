import React, {  useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import   NearbyJobCard  from '../common/cards/nearby/NearbyJobCard';
import  useFetchLocal  from '../../hook/useFetchLocal'; // Assuming useFetch is properly exported from useFetch.js
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { COLORS, icons, images, SIZES } from '../../constants';
import styles from './LikedJob.style';
import { Stack,router } from "expo-router";


const LikedJob = ({ jobs,deslike,refresh}) => {

  const { data, isLoading, error } = useFetchLocal('profile', {},jobs);
  const [refreshing, setRefreshing] = useState(false);


// console.log(data);

    // const { data, isLoading, error, refetch } = useFetch('job-details', {
    //   job_id: jobs,
    //   extended_publisher_details: 'false'
    // });


    const handleRefresh = () => {
      setRefreshing(true);
      refresh();
      setRefreshing(false);

    };
  return (
    <>
  
    {isLoading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ):  data.length === 0  ? (
        <Text>No data available  </Text>
    ) :(
      <View>
     
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <TouchableOpacity onPress={() => {deslike(item.job_id); }  } style={styles.rightAction}>
                  <Text style={styles.actionText}>
                    
                    
                    Delete</Text>
                </TouchableOpacity>
              )}
            >
              <NearbyJobCard
                isLiked={true}
                job={item}
                handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
              />
            </Swipeable>
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    )
    
    
    }
        </>

  );
};

export default LikedJob;