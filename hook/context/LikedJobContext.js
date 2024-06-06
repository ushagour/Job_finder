import React, { createContext, useContext, useState, useEffect } from 'react';
import {  useRouter } from 'expo-router';
import { addDoc, collection,doc, getDoc, getFirestore, setDoc,FIRESTORE_DB } from 'firebase/firestore';
import { app } from '../../firebase/config';


const LikedJobContext = createContext();
const router = useRouter();
const firestore = getFirestore(app);

export const LikedJobProvider = ({ children }) => {


    const updateOrCreateLikedJobs = async (uid, newLikedJobId) => {
        try {
            // console.log(newLikedJobId);
          const userDocRef = doc(firestore, 'likedJobs',  uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const currentLikedJobs = userDocSnap.data().likedJobs || [];
         
                // Check if the new liked job ID is already in the array
                if (!currentLikedJobs.includes(newLikedJobId)) {
                  // Add the new liked job ID to the array
                  const updatedLikedJobs = [...currentLikedJobs, newLikedJobId];
                  // Update the Firestore document with the updated array
                  await setDoc(userDocRef, { likedJobs: updatedLikedJobs });

                  console.log('Liked jobs updated successfully.');
                } else {
                  console.log('Job ID already exists in the liked jobs array.');
                }
          } else {
            // If the document doesn't exist, create it with the liked jobs field
            await setDoc(userDocRef, { likedJobs: [newLikedJobId] });
            console.log(`New document created for user with liked jobs.`);
          }
        } catch (error) {
          console.error('Error updating or creating liked jobs:', error.message);
        }
      };



      const removeLikedJob = async (uid, likedJobIdToRemove) => {
        try {
          const userDocRef = doc(firestore, 'likedJobs', uid);
          const userDocSnap = await getDoc(userDocRef);
      
          if (userDocSnap.exists()) {
            const currentLikedJobs = userDocSnap.data().likedJobs || [];
      
            // Check if the liked job ID to remove exists in the array
            if (currentLikedJobs.includes(likedJobIdToRemove)) {
              // Filter out the liked job ID to remove from the array
              const updatedLikedJobs = currentLikedJobs.filter(id => id !== likedJobIdToRemove);
              // Update the Firestore document with the updated array
              await setDoc(userDocRef, { likedJobs: updatedLikedJobs });
      
              console.log('Liked job removed successfully.');
            } else {
              console.log('Job ID not found in the liked jobs array.');
            }
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error removing liked job:', error.message);
        }
      };
      

// const addToLikes = async (jobId,user) => {
//     try {      
//       addDoc(collection(firestore, 'likedJobs'), { job_id: jobId , user_id: user.uid });
//       //send updates to the database 
//       // Optionally, make your database save request here
//     } catch (error) {
//       console.error('Error saving liked job:', error.message);
//     }
//   };

  return (
    <LikedJobContext.Provider value={{updateOrCreateLikedJobs,removeLikedJob}}>
      {children}
    </LikedJobContext.Provider>
  );
};

export const useLikedJob = () => {
    const context = useContext(LikedJobContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  