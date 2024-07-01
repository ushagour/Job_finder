import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,Share,Alert 
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetchLocal from "../../hook/useFetchLocal";
import useFetch from "../../hook/useFetch";
import { Stack,router } from "expo-router";
import { useRoute } from '@react-navigation/native';

const tabs = ["About", "Qualifications", "Responsibilities"];




const JobDetails = () => {

  const route = useRoute();
  const { id } = route.params;
  


  
  
  const { data, isLoading, error } = useFetchLocal('detail', {}, id);
  // console.log("com"+data[0]);
  // console.log(data[0].job_id);
  // const { data, isLoading, error, refetch } = useFetch("job-details", {
    //   job_id:id,
    // });
    const [activeTab,setActiveTab]=useState(tabs[0])

    const handleShare = async () => {
      try {
        const result = await Share.share({
          message: data[0].job_title,
          url: data[0]?.job_google_link,
          title: data[0].employer_name,
        });
    
        if (result.action === Share.sharedAction) {
          // console.log(result.activityType);
          // if (result.activityType) {
          //   alert(`the job :${data[0].job_title} had been sheared succusfuly !! on ${result.activityType}`  ) 
          //   // Shared via activity type Nb:here we can add a tras functionality 
          // } else {
          //   // Shared
          //   alert("2")
          // }


          // console.log(result.activityType);
          alert(`the job :${data[0].job_title} 
            had been sheared succusfuly !! on ${result.activityType}`  ) 

        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    };
    

 const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };
    return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>

            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite},
                    headerShadowVisible:false,
                    headerBackVisible:false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension={"60%"}
                        HandelOnPress={()=> router.back()}
                        
                        />
                    ),
                    headerRight:()=>(
                        <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"     
                        HandelOnPress={handleShare}
                        />
                    ),
                    headerTitle:''

                }}
                />
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>

                    
                    {
                    isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>

                          {error.message}
                        </Text>
                    ) :  data.length === 0  ? (
                        <Text>No data available  </Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />

                        <JobTabs

                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                        
                        
                        />

                        {displayTabContent()}

                        </View>
                    )
                    }

                    </ScrollView>
                    <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} jobId={id} />
                </>
    </SafeAreaView>
    )
  
}

export default JobDetails;