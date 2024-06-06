import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import   NearbyJobCard  from '../common/cards/nearby/NearbyJobCard';
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { COLORS, icons, images, SIZES } from '../../constants';
import styles from './LikedJob.style';


const LikedJob = ({ jobs,deslike,refresh}) => {

  const [refreshing, setRefreshing] = useState(false);









    const { data, isLoading, error, refetch } = useFetch('job-details', {
      job_id: jobs,
      extended_publisher_details: 'false'
    });


    const handleRefresh = () => {
      setRefreshing(true);
      refresh();
      setRefreshing(false);

    };
  return (
    <>
  
    {isLoading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : data.length > 0 ? (
      <View>
     
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <TouchableOpacity onPress={() => {deslike(item.job_id); refetch();}  } style={styles.rightAction}>
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
    :
    (<Text>Something went wrong</Text>)
    
    }
        </>

  );
};

export default LikedJob;