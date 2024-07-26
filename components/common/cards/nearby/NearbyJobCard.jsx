import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../helpers";
import { images } from "../../../../constants";
import { useAuth } from  '../../../../firebase/AuthContext';
import { useCallback,useEffect, useState } from "react";
import { addDoc, collection,doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../../../firebase/config';
import { useLikedJob } from  '../../../../hook/context/LikedJobContext';



const NearbyJobCard = ({ job,job_id, handleNavigate,userIsLiked }) => {
  
  const { user} = useAuth();
  const { updateOrCreateLikedJobs} =  useLikedJob();
  const[isLiked,setIsLiked] = useState(false);

    const fetchLikedJobs = useCallback(async () => {
      if (!user) return;
      
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'likedJobs', user.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const likedJobsData = userDocSnap.data().likedJobs || [];
          if (userIsLiked) {
            setIsLiked(true)
          }
          else{
            const jobIsLiked = likedJobsData.includes(job_id);
            setIsLiked(jobIsLiked);

          }
       
        } else {
          console.log("No liked jobs found for this user.");
        }
      } catch (error) {
        console.error('Error fetching liked jobs:', error);
      } 
    }, [user]);
  
  useEffect(() => {
    
    fetchLikedJobs()
  
  
  }, [])




    const handleLikeButtonPress = (job_id) => {
      const userId = user ? user.uid : '';

      if (userIsLiked) {
      alert('you already liked this job');
        return;
      }
     
      // console.log(jobId);
        // Toggle the liked status for the specific job
        // setLikedJobs((prevLikedJobs) => ({
        //   ...prevLikedJobs,
        //   [jobId]: !prevLikedJobs[jobId],
        // }));
       
        // if(islikedJob) {
        //   setisLikedJob(false)
        // }else{
        //   setisLikedJob(true)

        // }
    
        // Save liked job to the database (if needed)
        updateOrCreateLikedJobs(userId,job_id);
      };


  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title}
        </Text>

        <Text style={styles.jobType}>{job?.job_employment_type}</Text>
      </View>
    
{/*
ps1.
 By wrapping the handleLikeButtonPress function call in an arrow function (() => ...),
 you ensure that it's only invoked when the TouchableOpacity is pressed,
  rather than being called on every render.
  ps.use this jsx synthax insted of (user ? )check 
  */}

{user && job &&
      (<TouchableOpacity onPress={()=>{handleLikeButtonPress(job_id)}} style={styles.likeButton}>
        <Image
          source={isLiked ? require('../../../../assets/icons/heart.png') : require('../../../../assets/icons/heart-ol.png')}
          style={styles.likeIcon}
        />

      </TouchableOpacity>)
          }
    </TouchableOpacity>
  );
};

export default NearbyJobCard;