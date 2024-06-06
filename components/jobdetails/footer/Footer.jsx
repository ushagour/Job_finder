import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useState } from "react";
import styles from "./footer.style";
import { icons } from "../../../constants";
import { useAuth } from  '../../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { useLikedJob } from  '../../../hook/context/LikedJobContext';

const Footer = ({url,jobId}) => {//{param1,param 2}
        const { user } = useAuth();
        const router = useRouter();
        const { updateOrCreateLikedJobs} =  useLikedJob();
        const [islikedJob,  setisLikedJob] = useState(false);
        
        // console.log(jobId)
        const handleLikeButtonPress = (jobId) => {
          const userId = user ? user.uid : '';


          // Toggle the liked status for the specific job
            // setLikedJobs((prevLikedJobs) => ({
            //   ...prevLikedJobs,
            //   [jobId]: !prevLikedJobs[jobId],
            // }));
           
            if(islikedJob) {
              setisLikedJob(false)
            }else{
              setisLikedJob(true)
    
            }
        
            // Save liked job to the database (if needed)
            updateOrCreateLikedJobs(userId,jobId);
          };
    
  return (
    <View style={styles.container}>
      {!user?(
     <TouchableOpacity
     style={styles.LoginBtn}
     onPress={() => router.push(`/profile/login/Login`)}
   >
     <Text style={styles.applyBtnText}> Login to apply for job</Text>
   </TouchableOpacity>
      ):(
        <>



<TouchableOpacity style={styles.likeBtn} onPress={()=>{handleLikeButtonPress(jobId)}} >
<Image
  source={islikedJob ? icons.heart:icons.heartOutline}

  resizeMode='contain'
  style={styles.likeBtnImage}
/>
</TouchableOpacity>

      
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => Linking.openURL(url)}
              >
                <Text style={styles.applyBtnText}>Apply for job</Text>
              </TouchableOpacity>
              </>


      )}

  
    </View>
  )
}

export default Footer