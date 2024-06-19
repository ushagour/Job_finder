import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import useFetchLocal from "../../../hook/useFetchLocal";

const Popularjobs = (props) => {
  const router = useRouter();

  const { data, isLoading, error } = useFetchLocal('all', {});

  // const { data, isLoading, error } = useFetch("search", {
  //   query: `popular software developers in ${props.country}`,
  //   page: '1',
  // });



  const [selectedJob, setSelectedJob] = useState();


  
  const handleCardPress = (item) => {
    
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };







  
  const handelShowAllPress = (searchTerm) => {
    router.push(`/search/${searchTerm}`)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={()=>{handelShowAllPress(`popular software developers in ${props.country}`)}} >
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;